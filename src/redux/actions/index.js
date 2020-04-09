import {
  REGISTER_USER,
  UPDATE_GEOLOCATION,
  UPDATE_STATUS,
  UPDATE_WAITING_STATUS,
  UPDATE_LAST_UPLOAD_TIME,
} from '../constants';

export const registerUser = (payload) => {
  return {
    type: REGISTER_USER,
    payload: payload,
  };
};

export const updateGeolocation = (payload) => {
  return {
    type: UPDATE_GEOLOCATION,
    payload,
  };
};

export const updateStatus = (payload) => {
  return {
    type: UPDATE_STATUS,
    payload,
  };
};

export const updateWaitingStatus = (payload) => ({
  type: UPDATE_WAITING_STATUS,
  payload,
});

export const updateLastUploadTime = (payload) => ({
  type: UPDATE_LAST_UPLOAD_TIME,
  payload,
});
