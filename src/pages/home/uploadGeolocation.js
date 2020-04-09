import {CONFIG} from '../../config/config';

export const uploadGeolocation = async (data) => {
  return fetch(`${CONFIG.API_HOST}/api/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
