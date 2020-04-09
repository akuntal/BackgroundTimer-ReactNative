import {useEffect, useState} from 'react';
import {CONFIG} from '../config/config';
import {
  getUserDetails,
  saveStatusInCache,
  getSavedStatusFromCache,
  saveWaitingForStatus,
  WAITING_STATUS,
  getIsStatusWaiting,
} from '../utils';

const delay = 1000 * 60 * 2;

export const useGetStatus = () => {
  const [status, setStatus] = useState();

  useEffect(() => {
    (async () => {
      const statusFromCache = await getSavedStatusFromCache();
      if (statusFromCache) {
        setStatus(JSON.parse(statusFromCache));
      } else {
        setStatus(statusFromCache);
      }
    })();
  });

  return status;
};

export const startFetchingStatus = async () => {
  await saveWaitingForStatus(WAITING_STATUS.YES);
  let timer = setTimeout(async function update() {
    const result_status = await getIsStatusWaiting();
    if (result_status === WAITING_STATUS.NO) {
      timer = null;
      return;
    }

    const {phone} = JSON.parse(await getUserDetails());
    if (phone) {
      fetch(`${CONFIG.API_HOST}/api/status/${phone}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.data.length) {
            saveStatusInCache(JSON.stringify(json.data[0]));
            saveWaitingForStatus(WAITING_STATUS.NO);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    timer = setTimeout(update, delay);
  });
};
