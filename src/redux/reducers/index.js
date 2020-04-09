import {
  REGISTER_USER,
  UPDATE_GEOLOCATION,
  UPDATE_STATUS,
  UPDATE_WAITING_STATUS,
  UPDATE_LAST_UPLOAD_TIME,
} from '../constants';
import {LIMITS_GEOLOCATIONS} from '../../utils';

const initialState = {
  isUserRegistered: false,
  user: {yob: 1990, gender: 'M', phone: ''},
  geolocations: [],
  status: {},
  lastUploadTime: 0,
  isStatusWaiting: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_GEOLOCATION:
      const geolocations = state.geolocations;
      if (geolocations.length > LIMITS_GEOLOCATIONS) {
        geolocations.pop();
      }
      return {
        ...state,
        geolocations: [action.payload, ...geolocations],
      };
    case UPDATE_STATUS:
      return {
        ...state,
        status: {...action.payload},
      };
    case UPDATE_WAITING_STATUS:
      return {
        ...state,
        isStatusWaiting: action.payload,
      };
    case UPDATE_LAST_UPLOAD_TIME:
      return {
        ...state,
        lastUploadTime: action.payload,
      };
    default:
      return state;
  }
};
