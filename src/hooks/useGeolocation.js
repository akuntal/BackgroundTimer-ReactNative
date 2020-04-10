import {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateGeolocation} from '../redux/actions';
import {GEOLOCATION_DELAY} from '../utils';

navigator.geolocation = require('@react-native-community/geolocation');

export const useGeolocation = () => {
  const geolocations = useSelector((state) => state.appState.geolocations);
  const isUserRegistered = useSelector(
    (state) => state.appState.isUserRegistered,
  );
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
        {
          enableHighAccuracy: false,
          timeout: GEOLOCATION_DELAY,
          maximumAge: GEOLOCATION_DELAY,
        },
      );
    } else {
      Alert.alert('Error', 'geolocation not supported!!!');
    }
  };

  useEffect(() => {
    if (isUserRegistered) {
      getGeolocation();
      BackgroundTimer.runBackgroundTimer(() => {
        getGeolocation();
      }, GEOLOCATION_DELAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserRegistered]);

  return geolocations;
};
