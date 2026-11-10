import { LOCATION_PROXIMITY_MATRIX } from '../data/mockData';

/**
 * Tokenize string for keyword similarity
 */
const tokenize = (text) => {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
};

/**
 * Calculate Jaccard similarity between two token sets
 */
const calculateKeywordSimilarity = (text1, text2) => {
  const tokens1 = new Set(tokenize(text1));
  const tokens2 = new Set(tokenize(text2));

  if (tokens1.size === 0 || tokens2.size === 0) return 0;

  const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
  const union = new Set([...tokens1, ...tokens2]);

  return intersection.size / union.size;
};

/**
 * Get location proximity score between two campus spots
 */
const getLocationProximity = (loc1, loc2) => {
  if (!loc1 || !loc2) return 0.2;
  if (loc1.trim().toLowerCase() === loc2.trim().toLowerCase()) return 1.0;

  if (LOCATION_PROXIMITY_MATRIX[loc1] && LOCATION_PROXIMITY_MATRIX[loc1][loc2] !== undefined) {
    return LOCATION_PROXIMITY_MATRIX[loc1][loc2];
  }

  if (LOCATION_PROXIMITY_MATRIX[loc2] && LOCATION_PROXIMITY_MATRIX[loc2][loc1] !== undefined) {
    return LOCATION_PROXIMITY_MATRIX[loc2][loc1];
  }

  return 0.35; // Default campus building proximity
};

/**
 * Calculate date proximity score (0 to 1)
 * Items reported within 0-3 days get highest score, decreasing thereafter
 */
const getDateProximity = (dateLostStr, dateFoundStr) => {
  if (!dateLostStr || !dateFoundStr) return 0.5;

  const dateLost = new Date(dateLostStr).getTime();
  const dateFound = new Date(dateFoundStr).getTime();

  if (isNaN(dateLost) || isNaN(dateFound)) return 0.5;

  const diffDays = Math.abs(dateFound - dateLost) / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) return 1.0;
  if (diffDays <= 3) return 0.85;
  if (diffDays <= 7) return 0.65;
  if (diffDays <= 14) return 0.45;
  if (diffDays <= 30) return 0.25;
  return 0.1;
};

/**
 * Transparent Weighted Match Engine
 * Weights:
 * - Category: 30% (Must match or be highly compatible)
 * - Name Similarity: 25%
 * - Color: 15%
 * - Brand: 10%
 * - Location: 10%
 * - Date Proximity: 10%
 */
export const calculateMatchScore = (lostItem, foundItem) => {
  const matchingAttributes = [];
  const differences = [];
  const explanations = [];

  // 1. Category Check (Weight: 30)
  let categoryScore = 0;
  const isExactCategory = (lostItem.category || '').toLowerCase() === (foundItem.category || '').toLowerCase();
  if (isExactCategory) {
    categoryScore = 30;
    matchingAttributes.push(`Same Category (${lostItem.category})`);
    explanations.push(`Both records belong to the exact category: "${lostItem.category}".`);
  } else {
    differences.push(`Different Categories ("${lostItem.category}" vs "${foundItem.category}")`);
    explanations.push(`Category mismatch between "${lostItem.category}" and "${foundItem.category}".`);
  }

  // 2. Name & Description Text Similarity (Weight: 25)
  const nameSim = calculateKeywordSimilarity(lostItem.name, foundItem.name);
  const descSim = calculateKeywordSimilarity(lostItem.description, foundItem.description);
  const textSimCombined = Math.max(nameSim, (nameSim * 0.7 + descSim * 0.3));
  const nameScore = Math.round(textSimCombined * 25);

  if (nameSim > 0.4) {
    matchingAttributes.push('Item Title Keywords');
    explanations.push(`High textual similarity in item title and descriptions.`);
  } else if (nameSim > 0.1) {
    matchingAttributes.push('Partial Title Overlap');
    explanations.push(`Shares common keywords in the listing description.`);
  } else {
    differences.push('Differing Title Descriptions');
  }

  // 3. Color Comparison (Weight: 15)
  let colorScore = 0;
  const lostColor = (lostItem.color || '').trim().toLowerCase();
  const foundColor = (foundItem.color || '').trim().toLowerCase();
  if (lostColor && foundColor && lostColor === foundColor) {
    colorScore = 15;
    matchingAttributes.push(`Matching Color (${lostItem.color})`);
    explanations.push(`Color match confirmed: "${lostItem.color}".`);
  } else if (lostColor && foundColor && (foundItem.description || '').toLowerCase().includes(lostColor)) {
    colorScore = 10;
    matchingAttributes.push(`Color mentioned in details`);
    explanations.push(`Found item description notes the color "${lostItem.color}".`);
  } else {
    colorScore = 2;
    differences.push(`Color (${lostItem.color || 'Unspecified'} vs ${foundColor || 'Unspecified'})`);
  }

  // 4. Brand Comparison (Weight: 10)
  let brandScore = 0;
  const lostBrand = (lostItem.brand || '').trim().toLowerCase();
  const foundBrand = (foundItem.brand || '').trim().toLowerCase();
  if (lostBrand && foundBrand && lostBrand === foundBrand && lostBrand !== 'other' && lostBrand !== 'n/a') {
    brandScore = 10;
    matchingAttributes.push(`Same Brand (${lostItem.brand})`);
    explanations.push(`Both items are made by ${lostItem.brand}.`);
  } else if (lostBrand && (foundItem.name || '').toLowerCase().includes(lostBrand)) {
    brandScore = 8;
    matchingAttributes.push(`Brand identified in title (${lostItem.brand})`);
    explanations.push(`Found report references brand "${lostItem.brand}".`);
  } else if (!lostBrand && !foundBrand) {
    brandScore = 5; // Neutral
  } else {
    differences.push(`Brand distinction (${lostItem.brand || 'Unbranded'} vs ${foundItem.brand || 'Unbranded'})`);
  }

  // 5. Location Proximity (Weight: 10)
  const locProximityFactor = getLocationProximity(lostItem.location, foundItem.location);
  const locationScore = Math.round(locProximityFactor * 10);
  if (locProximityFactor >= 0.9) {
    matchingAttributes.push(`Same Location (${lostItem.location})`);
    explanations.push(`Both items reported at the exact same campus location: ${lostItem.location}.`);
  } else if (locProximityFactor >= 0.6) {
    matchingAttributes.push(`Adjacent Campus Area`);
    explanations.push(`Locations (${lostItem.location} & ${foundItem.location}) are closely situated.`);
  } else {
    differences.push(`Different Zone (${lostItem.location} vs ${foundItem.location})`);
  }

  // 6. Date Proximity (Weight: 10)
  const dateProximityFactor = getDateProximity(lostItem.date, foundItem.date);
  const dateScore = Math.round(dateProximityFactor * 10);
  if (dateProximityFactor >= 0.8) {
    matchingAttributes.push(`Reported within 48h`);
    explanations.push(`Timestamps match closely (${lostItem.date} vs ${foundItem.date}).`);
  } else if (dateProximityFactor >= 0.5) {
    matchingAttributes.push(`Reported same week`);
  } else {
    differences.push(`Significant date difference`);
  }

  // Total score calculation
  const totalScore = Math.min(100, Math.max(0, categoryScore + nameScore + colorScore + brandScore + locationScore + dateScore));

  let confidenceLevel = 'low';
  if (totalScore >= 75) {
    confidenceLevel = 'high';
  } else if (totalScore >= 50) {
    confidenceLevel = 'medium';
  }

  return {
    score: totalScore,
    confidenceLevel,
    breakdown: {
      categoryScore,
      nameScore,
      colorScore,
      brandScore,
      locationScore,
      dateScore
    },
    matchingAttributes,
    differences,
    explanations,
    lostItem,
    foundItem
  };
};

/**
 * Compute all smart matches between lost items and found items
 */
export const findSmartMatches = (lostItems, foundItems, minScore = 35) => {
  const matches = [];

  lostItems.forEach(lost => {
    foundItems.forEach(found => {
      // Don't match if already recovered or returned
      if (lost.status === 'Recovered' || found.status === 'Returned') return;

      const result = calculateMatchScore(lost, found);
      if (result.score >= minScore) {
        matches.push({
          id: `match-${lost.id}-${found.id}`,
          ...result
        });
      }
    });
  });

  // Sort descending by score
  return matches.sort((a, b) => b.score - a.score);
};

/**
 * Get matches for a single item (either lost or found)
 */
export const getItemMatches = (item, type, otherItems) => {
  if (!item || !otherItems) return [];
  const matches = [];

  otherItems.forEach(other => {
    const result = type === 'lost' 
      ? calculateMatchScore(item, other)
      : calculateMatchScore(other, item);

    if (result.score >= 35) {
      matches.push({
        id: `match-${item.id}-${other.id}`,
        ...result,
        matchedItem: other
      });
    }
  });

  return matches.sort((a, b) => b.score - a.score);
};

