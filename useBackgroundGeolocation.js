import {useState, useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {AsyncStorage,Alert} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');

const GEO_LOCATION_KEY = 'GEO_LOCATION_KEY_22';

const delay = 1000;

const delay_status = 1000000;



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

export const getPersonStatus = () => {
    const [status, setStatus] = useState([]);

  useEffect(() => {
    let timer = setTimeout(async function update() {
      //const user_status = JSON.parse(
        fetch('http://192.168.0.6:8085/api/status/9312858851', {
                method: 'GET',
              })
                .then(response => response.json())
                .then(json => {
                  //Alert.alert("working"+json.data[0].status)
                  setStatus(json.data[0])
                })
                .catch(error => {
                  console.error(error);
                  //Alert.alert("working")
                });
     // );
      //setGeolocations(cached_locations);
      timer = setTimeout(update, delay_status);
    }, delay_status);
  }, []);

  return [status];
};


export const uploadData = async () => {
    const cached_locations = await AsyncStorage.getItem(GEO_LOCATION_KEY);
    const data = {};
    data.userData = JSON.parse(cached_locations);
    data.gender = "F";
    data.yob = "1980"
    data.phone = "9812345677"
    console.log(JSON.stringify(data));
    fetch('http://192.168.0.6:8085/api/contacts', {
                    method: 'POST',
                    headers: {
                     Accept: 'application/json',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  })
                    .then(response => response.json())
                    .then(json => {
                      Alert.alert("Data uploaded successfully!!")
                      clearCache();
                    })
                    .catch(error => {
                      console.error(error);
                    });
}

export const clearCache = async () => {
    await AsyncStorage.setItem(GEO_LOCATION_KEY, JSON.stringify([]));
}

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
//  fetch('http://localhost:8085/api/status/9312858851')
//  .then((response) => response.json())
//  .then((responseJson) => {
//  Alert.alert("working")
//  })

//  fetch('https://jsonplaceholder.typicode.com/posts/1', {
//        method: 'GET',
//      })
//        .then(response => response.json())
//        .then(json => {
//          Alert.alert("working")
//        })
//        .catch(error => {
//          console.error(error);
//        });

  getGeolocation();
}, delay);
