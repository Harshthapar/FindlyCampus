import {
  INITIAL_LOST_ITEMS,
  INITIAL_FOUND_ITEMS,
  INITIAL_USER_SETTINGS
} from '../data/mockData';

const STORAGE_KEYS = {
  LOST_ITEMS: 'findly_campus_lost_items',
  FOUND_ITEMS: 'findly_campus_found_items',
  SETTINGS: 'findly_campus_settings',
  SAVED_MATCHES: 'findly_campus_saved_matches',
  INITIALIZED: 'findly_campus_initialized_v1'
};

// Safe JSON parser helper
export const safeParse = (data, fallback) => {
  if (!data) return fallback;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing localStorage item:', e);
    return fallback;
  }
};

// Initialize seed data if not present
export const initializeStorage = (forceReset = false) => {
  try {
    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInitialized || forceReset) {
      localStorage.setItem(STORAGE_KEYS.LOST_ITEMS, JSON.stringify(INITIAL_LOST_ITEMS));
      localStorage.setItem(STORAGE_KEYS.FOUND_ITEMS, JSON.stringify(INITIAL_FOUND_ITEMS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_USER_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.SAVED_MATCHES, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize localStorage:', error);
    return false;
  }
};

// Lost Items
export const getLostItems = () => {
  const data = localStorage.getItem(STORAGE_KEYS.LOST_ITEMS);
  return safeParse(data, INITIAL_LOST_ITEMS);
};

export const saveLostItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOST_ITEMS, JSON.stringify(items));
    return true;
  } catch (e) {
    console.error('Failed to save lost items:', e);
    return false;
  }
};

export const addLostItem = (item) => {
  const items = getLostItems();
  const newItem = {
    ...item,
    id: `lost-${Date.now()}`,
    date: item.date || new Date().toISOString().split('T')[0],
    status: item.status || 'Active',
    reportedBy: item.reportedBy || 'Demo Student User',
    isDemo: false,
    isCurrentUser: true,
    contactInfo: item.contactInfo || 'student@campus.edu'
  };
  const updated = [newItem, ...items];
  saveLostItems(updated);
  return newItem;
};

// Found Items
export const getFoundItems = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FOUND_ITEMS);
  return safeParse(data, INITIAL_FOUND_ITEMS);
};

export const saveFoundItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FOUND_ITEMS, JSON.stringify(items));
    return true;
  } catch (e) {
    console.error('Failed to save found items:', e);
    return false;
  }
};

export const addFoundItem = (item) => {
  const items = getFoundItems();
  const newItem = {
    ...item,
    id: `found-${Date.now()}`,
    date: item.date || new Date().toISOString().split('T')[0],
    status: item.status || 'Active',
    reportedBy: item.reportedBy || 'Demo Student User',
    isDemo: false,
    isCurrentUser: true,
    contactInfo: item.contactInfo || 'student@campus.edu'
  };
  const updated = [newItem, ...items];
  saveFoundItems(updated);
  return newItem;
};

// Update an item by type
export const updateItem = (type, updatedItem) => {
  if (type === 'lost') {
    const items = getLostItems();
    const index = items.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      saveLostItems(items);
      return items[index];
    }
  } else {
    const items = getFoundItems();
    const index = items.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      saveFoundItems(items);
      return items[index];
    }
  }
  return null;
};

// Delete an item
export const deleteItem = (type, id) => {
  if (type === 'lost') {
    const items = getLostItems().filter(i => i.id !== id);
    saveLostItems(items);
    return true;
  } else {
    const items = getFoundItems().filter(i => i.id !== id);
    saveFoundItems(items);
    return true;
  }
};

// Settings
export const getSettings = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return safeParse(data, INITIAL_USER_SETTINGS);
};

export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    return false;
  }
};

// Reset All Data
export const resetAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.LOST_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.FOUND_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.SAVED_MATCHES);
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeStorage(true);
};

