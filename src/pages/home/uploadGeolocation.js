import {Alert} from 'react-native';
import {clearLocationCache, getUserDetails} from '../../utils';
import {CONFIG} from '../../config/config';

export const uploadGeolocation = async (geolocations) => {
  const user = JSON.parse(await getUserDetails());
  const data = {userData: geolocations, ...user};

  fetch(`${CONFIG.API_HOST}/api/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      Alert.alert('Data uploaded successfully!!');
      clearLocationCache();
    })
    .catch((error) => {
      console.error(error);
    });
};
