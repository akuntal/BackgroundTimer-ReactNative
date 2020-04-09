import {Alert} from 'react-native';
import {
  clearLocationCache,
  getUserDetails,
  saveWaitingForStatus,
  WAITING_STATUS,
} from '../../utils';
import {CONFIG} from '../../config/config';

export const uploadGeolocation = async (geolocations) => {
  const user = JSON.parse(await getUserDetails());
  const data = {userData: geolocations, ...user};

  return fetch(`${CONFIG.API_HOST}/api/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async (json) => {
      await clearLocationCache();
      await saveWaitingForStatus(WAITING_STATUS.YES);
    })
    .catch((error) => {
      console.error(error);
    });
};
