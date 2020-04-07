import {AsyncStorage} from 'react-native';

export const getIncrementalArray = (min, max) => {
  const arr = [];
  for (let i = max; i >= min; i--) {
    arr.push(i);
  }
  return arr;
};

const USER_DETAILS = 'USER_DETAILS_@@@@@@';

const GEO_LOCATION_KEY = 'GEO_LOCATION_KEY';

export const saveUserDetails = (user_details) =>
  AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user_details));

/**
 * return users details from cache
 */
export const getUserDetails = () => AsyncStorage.getItem(USER_DETAILS);

/**
 * Clears locations, stored in cache
 */
export const clearLocationCache = AsyncStorage.setItem(
  GEO_LOCATION_KEY,
  JSON.stringify([]),
);

/**
 * return locations from cache
 */
export const getLocationFromCache = () =>
  AsyncStorage.getItem(GEO_LOCATION_KEY);

/**
 * Save location into local cache
 * @param {string} locations -
 */
export const saveLocationInCache = (locations) =>
  AsyncStorage.setItem(GEO_LOCATION_KEY, locations);

export const STATUS_COLORS = {
  high: '#f00',
  mid: '#ffaa1d',
  safe: '#008000',
};
