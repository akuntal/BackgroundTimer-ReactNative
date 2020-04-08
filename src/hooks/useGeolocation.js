import {useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {getLocationFromCache, saveLocationInCache} from '../utils';
import {Alert} from 'react-native';

navigator.geolocation = require('@react-native-community/geolocation');

const delay = 5000;

export const useGeolocation = () => {
  const [geolocations, setGeolocations] = useState([]);

  useEffect(() => {
    let timer = setTimeout(async function update() {
      const cached_locations = JSON.parse(await getLocationFromCache());
      setGeolocations(cached_locations);
      timer = setTimeout(update, delay);
    }, delay);
  }, []);

  return geolocations;
};

const storeGeolocations = async (location) => {
  const cached_locations = await getLocationFromCache();

  const arr_cached_locations = cached_locations
    ? JSON.parse(cached_locations)
    : [];

  const concated_locations = [location, ...arr_cached_locations];

  await saveLocationInCache(JSON.stringify(concated_locations));
};

const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({timestamp, coords: {latitude, longitude}}) => {
        storeGeolocations({timestamp, latitude, longitude});
      },
      (error) => {
        console.log(error);
        Alert.alert('Error', JSON.stringify(error));
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 0},
    );
  } else {
    Alert.alert('Error', 'geolocation not supported!!!');
  }
};

BackgroundTimer.runBackgroundTimer(async () => {
  getGeolocation();
}, delay);
