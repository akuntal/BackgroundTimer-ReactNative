import {useEffect, useState} from 'react';
import {CONFIG} from '../config/config';
import {getUserDetails} from '../utils';

const delay = 1000 * 60 * 2;

export const useGetStatus = () => {
  const [status, setStatus] = useState();

  useEffect(() => {
    let timer = setTimeout(async function update() {
      const {phone} = JSON.parse(await getUserDetails());
      fetch(`${CONFIG.API_HOST}/api/status/${phone}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          setStatus(json.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });

      timer = setTimeout(update, delay);
    }, delay);
  }, []);

  return status;
};
