import {useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {AsyncStorage} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');

const GEO_LOCATION_KEY = 'GEO_LOCATION_KEY_22';

const delay = 5000;

export const useBackgroundGeolocation = () => {
  const [geolocations, setGeolocations] = useState([]);

  useEffect(() => {
    let timer = setTimeout(async function update() {
      const cached_locations = JSON.parse(
        await AsyncStorage.getItem(GEO_LOCATION_KEY),
      );
      setGeolocations(cached_locations);
      timer = setTimeout(update, delay);
    }, delay);
  }, []);

  return [geolocations];
};

const storeGeolocations = async (location) => {
  const cached_locations = await AsyncStorage.getItem(GEO_LOCATION_KEY);

  const arr_cached_locations = cached_locations
    ? JSON.parse(cached_locations)
    : [];

  const concated_locations = [location, ...arr_cached_locations]; // `${JSON.stringify(location)}$$${cached_locations}`;

  await AsyncStorage.setItem(
    GEO_LOCATION_KEY,
    JSON.stringify(concated_locations),
  );
};

const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({timestamp, coords: {latitude, longitude}}) => {
        storeGeolocations({timestamp, latitude, longitude});
      },
      (error) => {
        console.log(error);
        storeGeolocations({error: 'error'});
      },
    );
  } else {
    storeGeolocations({error: 'geolocation not supported!!!'});
  }
};

BackgroundTimer.runBackgroundTimer(async () => {
  //code that will be called every 3 seconds
  getGeolocation();
}, delay);
