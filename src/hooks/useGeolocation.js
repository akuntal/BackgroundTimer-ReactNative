import {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateGeolocation} from '../redux/actions';
import {GEOLOCATION_DELAY} from '../utils';

navigator.geolocation = require('@react-native-community/geolocation');

export const useGeolocation = () => {
  const geolocations = useSelector((state) => state.appState.geolocations);

  console.log(geolocations);
  const dispatch = useDispatch();

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({timestamp, coords: {latitude, longitude}}) => {
          dispatch(updateGeolocation({timestamp, latitude, longitude}));
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

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      getGeolocation();
    }, GEOLOCATION_DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return geolocations;
};
