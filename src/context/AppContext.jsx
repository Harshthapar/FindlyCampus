import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeStorage,
  getLostItems,
  getFoundItems,
  getSettings,
  addLostItem as apiAddLostItem,
  addFoundItem as apiAddFoundItem,
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
  saveSettings as apiSaveSettings,
  resetAllData as apiResetAllData
} from '../utils/storage';
import { findSmartMatches } from '../utils/matchingEngine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [matches, setMatches] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and load data on mount
  useEffect(() => {
    initializeStorage();
    loadAllData();
  }, []);

  const loadAllData = () => {
    const lost = getLostItems();
    const found = getFoundItems();
    const currentSettings = getSettings();

    setLostItems(lost);
    setFoundItems(found);
    setSettings(currentSettings);

    const calculatedMatches = findSmartMatches(lost, found);
    setMatches(calculatedMatches);
    setIsLoading(false);
  };

  // Toast notification manager
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Action methods
  const createLostReport = (data) => {
    const newItem = apiAddLostItem(data);
    const updated = [newItem, ...lostItems];
    setLostItems(updated);
    const updatedMatches = findSmartMatches(updated, foundItems);
    setMatches(updatedMatches);
    addToast('Lost item reported successfully and posted to campus board!', 'success');
    return newItem;
  };

  const createFoundReport = (data) => {
    const newItem = apiAddFoundItem(data);
    const updated = [newItem, ...foundItems];
    setFoundItems(updated);
    const updatedMatches = findSmartMatches(lostItems, updated);
    setMatches(updatedMatches);
    addToast('Found item reported successfully! Thank you for helping fellow students.', 'success');
    return newItem;
  };

  const updateItemDetails = (type, item) => {
    const updated = apiUpdateItem(type, item);
    if (updated) {
      if (type === 'lost') {
        const list = lostItems.map((i) => (i.id === item.id ? updated : i));
        setLostItems(list);
        setMatches(findSmartMatches(list, foundItems));
      } else {
        const list = foundItems.map((i) => (i.id === item.id ? updated : i));
        setFoundItems(list);
        setMatches(findSmartMatches(lostItems, list));
      }
      addToast('Report updated successfully.', 'success');
    }
    return updated;
  };

  const removeItem = (type, id) => {
    const success = apiDeleteItem(type, id);
    if (success) {
      if (type === 'lost') {
        const list = lostItems.filter((i) => i.id !== id);
        setLostItems(list);
        setMatches(findSmartMatches(list, foundItems));
      } else {
        const list = foundItems.filter((i) => i.id !== id);
        setFoundItems(list);
        setMatches(findSmartMatches(lostItems, list));
      }
      addToast('Report deleted from system.', 'info');
    }
    return success;
  };

  const markItemAsRecovered = (id) => {
    const item = lostItems.find((i) => i.id === id);
    if (item) {
      updateItemDetails('lost', { ...item, status: 'Recovered' });
      addToast('Item successfully marked as Recovered! 🎉', 'success');
    }
  };

  const markItemAsReturned = (id) => {
    const item = foundItems.find((i) => i.id === id);
    if (item) {
      updateItemDetails('found', { ...item, status: 'Returned' });
      addToast('Item successfully marked as Returned to owner! 🤝', 'success');
    }
  };

  const updateUserSettings = (newSettings) => {
    setSettings(newSettings);
    apiSaveSettings(newSettings);
    addToast('Settings preferences saved.', 'success');
  };

  const resetPlatformData = () => {
    apiResetAllData();
    loadAllData();
    addToast('Platform reset to initial demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        lostItems,
        foundItems,
        matches,
        settings,
        toasts,
        isLoading,
        addToast,
        removeToast,
        createLostReport,
        createFoundReport,
        updateItemDetails,
        removeItem,
        markItemAsRecovered,
        markItemAsReturned,
        updateUserSettings,
        resetPlatformData,
        refreshData: loadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

