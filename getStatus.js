import {useState, useEffect} from 'react';
import {AsyncStorage,Alert} from 'react-native';


const delay_status = 1000;

export const getPersonStatus = () => {
    const [status, setStatus] = useState([]);

  useEffect(() => {
    let timer = setTimeout(async function update() {
      //const user_status = JSON.parse(
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'GET',
              })
                .then(response => response.json())
                .then(json => {
                  //Alert.alert("working")
                  setStatus(json.body)
                })
                .catch(error => {
                  console.error(error);
                });
     // );
      //setGeolocations(cached_locations);
      timer = setTimeout(update, delay_status);
    }, delay_status);
  }, []);

  return [status];
};