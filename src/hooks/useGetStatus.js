import {CONFIG} from '../config/config';

export const fetchStatus = (phone) => {
  return fetch(`${CONFIG.API_HOST}/api/status/${phone}`, {
    method: 'GET',
  })
    .then((response) => response.json())

    .catch((error) => {
      console.error(error);
    });
};
