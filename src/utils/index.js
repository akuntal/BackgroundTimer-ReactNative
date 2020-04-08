import {AsyncStorage} from 'react-native';

export const getIncrementalArray = (min, max) => {
  const arr = [];
  for (let i = max; i >= min; i--) {
    arr.push(i);
  }
  return arr;
};

const USER_DETAILS = 'USER_DETAILS_333';

const GEO_LOCATION_KEY = 'GEO_LOCATION_KEY';

const WAITING_FOR_STATUS = 'WAITING_FOR_STATUS';

const RESULT_STATUS = 'RESULT_STATUS';

export const WAITING_STATUS = {
  YES: 'yes',
  NO: 'no',
};

export const saveUserDetails = (user_details) =>
  AsyncStorage.setItem(USER_DETAILS, JSON.stringify(user_details));

/**
 * return users details from cache
 */
export const getUserDetails = () => AsyncStorage.getItem(USER_DETAILS);

/**
 * Clears locations, stored in cache
 */
export const clearLocationCache = () =>
  AsyncStorage.setItem(GEO_LOCATION_KEY, JSON.stringify([]));

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

export const getIsStatusWaiting = () =>
  AsyncStorage.getItem(WAITING_FOR_STATUS);

export const saveWaitingForStatus = (status) =>
  AsyncStorage.setItem(WAITING_FOR_STATUS, status);

/**
 * save result to cache
 * @param {string} status - result json
 */
export const saveStatus = (status) =>
  AsyncStorage.setItem(RESULT_STATUS, status);

/**
 * returns saved result from cache
 */
export const getSavedStatus = () => AsyncStorage.getItem(RESULT_STATUS);

export const STATUS_COLORS = {
  high: '#f00',
  mid: '#ffaa1d',
  safe: '#008000',
};

export const convertTimestampToDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toDateString();
};
