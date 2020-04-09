import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  getUserDetails,
  STATUS_COLORS,
  convertTimestampToDate,
  getIsStatusWaiting,
  WAITING_STATUS,
  saveLastUploadTime,
  getLastUploadTime,
} from '../../utils';
import {Location} from '../../components/Location';
import {useGeolocation} from '../../hooks/useGeolocation';
import {uploadGeolocation} from './uploadGeolocation';
import {useGetStatus, startFetchingStatus} from '../../hooks/useGetStatus';
import {Header} from '../../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AlertComponent} from '../../components/Alert';
import {Button} from '../../components/Button';

const upload_delay = 60 * 60 * 24 * 1000; // one day

export default function Home() {
  const [notification, setNotification] = useState(
    'Your location is being tracked.',
  );

  const [showAlert, setShowAlert] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const user = await getUserDetails();
      if (!user) {
        navigation.navigate('Profile');
      }
    })();
  });

  useEffect(() => {
    (async () => {
      const waitingStatus = await getIsStatusWaiting();
      if (waitingStatus === WAITING_STATUS.YES) {
        startFetchingStatus();
      }
    })();
  }, []);

  const geolocations = useGeolocation();

  const status = useGetStatus();

  const handlerUploadPress = () => {
    setShowAlert(false);

    setNotification('Your location data is uploading...');

    uploadGeolocation(geolocations).then(() => {
      setNotification('Data is uploaded. Pls wait for the update');
      startFetchingStatus();

      const uploadedTime = new Date();
      saveLastUploadTime(uploadedTime.getTime().toString());
      resetNotification();
    });
  };

  const sendAlert = async () => {
    const lastUploadTime = await getLastUploadTime();

    const currentTime = new Date().getTime();

    const diff = currentTime - lastUploadTime;
    if (diff > upload_delay) {
      setShowAlert(true);
    } else {
      setNotification('Please wait for atleast 24hrs to upload again');
      resetNotification();
    }
  };

  const resetNotification = (time = 5000) => {
    setTimeout(() => {
      setNotification('Your location is being tracked.');
    }, time);
  };

  const circleStyles = (color) => {
    return {...styles.circle, borderColor: color};
  };

  const statusTextStyles = (color) => {
    return {...styles.statusText, color};
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header showLogo={true} />
      <SafeAreaView style={styles.mainContainer}>
        {status && (
          <View style={styles.containerTop}>
            <Text style={styles.headText}>Risk Factor</Text>
            <View
              style={circleStyles(STATUS_COLORS[status.status.toLowerCase()])}>
              <Text
                style={statusTextStyles(
                  STATUS_COLORS[status.status.toLowerCase()],
                )}>
                {status.status.toUpperCase()}
              </Text>
            </View>
            <View style={styles.intersectionTextContainer}>
              <Text style={styles.intersectionText}>Total Intersection </Text>
              <Text style={styles.intersectionTextBold}>
                {status.numberIntersections}
              </Text>
            </View>
          </View>
        )}
        {status && (
          <View style={styles.locationsContainer}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <View style={styles.body}>
                {status.intersections?.map(({timestamp, lat, long}, index) => (
                  <Location
                    key={`key-${timestamp + index}`}
                    time={convertTimestampToDate(timestamp)}
                    location={`Lat-${lat}, Long-${long}`}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
      <View style={styles.upload}>
        {/* <Button title="UPLOAD" onPress={sendAlert} /> */}
        <Button handlerPress={sendAlert} label="UPLOAD" />
      </View>
      <View style={styles.notificationArea}>
        <Text style={styles.notification}>{notification}</Text>
      </View>
      <AlertComponent
        showAlert={showAlert}
        onCancel={() => setShowAlert(false)}
        onOk={() => handlerUploadPress()}
        message="We will share your location data and will fetch your intersections with infected people. Do you wish to proceed?"
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  headText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
    color: '#343C41',
  },
  containerTop: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  circle: {
    borderRadius: 60,
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
  },
  intersectionTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  intersectionText: {
    color: '#4B5860',
    fontSize: 12,
    fontFamily: 'Helvetica Neue',
  },
  intersectionTextBold: {
    color: '#4B5860',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  locationsContainer: {
    marginTop: 20,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },

  container: {
    opacity: 1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },

  scrollView: {
    maxHeight: 250,
  },
  upload: {
    position: 'absolute',
    bottom: 50,
    width: 150,
    marginTop: 20,
    alignSelf: 'center',
  },
  notificationArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#232527',
  },
  notification: {
    color: Colors.light,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    fontFamily: 'Helvetica Neue',
  },
});
