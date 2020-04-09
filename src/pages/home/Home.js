import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {STATUS_COLORS, UPLOAD_DELAY, FETCH_STATUS_DELAY} from '../../utils';
import {Location} from '../../components/Location';
import {useGeolocation} from '../../hooks/useGeolocation';
import {uploadGeolocation} from './uploadGeolocation';
import {fetchStatus} from '../../hooks/useGetStatus';
import {Header} from '../../components/Header';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AlertComponent} from '../../components/Alert';
import {Button} from '../../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateWaitingStatus,
  updateStatus,
  updateLastUploadTime,
} from '../../redux/actions';
import {LowText} from '../../components/LowText';
import {MidText} from '../../components/MidText';
import {HighText} from '../../components/HighText';

const afterUploadNotification =
  'Your location data is uploaded. Please wait for assessment results. ';
const normalNotification = 'Your location is being tracked.';

const uploadingNotification = 'Your location data is uploading...';

export default function Home() {
  const isUserRegistered = useSelector(
    (state) => state.appState.isUserRegistered,
  );

  const user = useSelector((state) => state.appState.user);

  const status = useSelector((state) => state.appState.status);

  const lastUploadTime = useSelector((state) => state.appState.lastUploadTime);

  const isStatusWaiting = useSelector(
    (state) => state.appState.isStatusWaiting,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  if (!isUserRegistered) {
    navigation.navigate('Profile');
  }

  const geolocations = useGeolocation();

  const [notification, setNotification] = useState(normalNotification);

  const [showAlert, setShowAlert] = useState(false);

  const fetchStatusNow = () => {
    fetchStatus(user.phone).then((res) => {
      if (res.data.length) {
        dispatch(updateWaitingStatus(false));
        dispatch(updateStatus(res.data[0]));
        resetNotification();
      } else {
        setTimeout(fetchStatusNow, FETCH_STATUS_DELAY);
      }
    });
  };

  useEffect(() => {
    if (isStatusWaiting) {
      setNotification(afterUploadNotification);
      fetchStatusNow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerUploadPress = () => {
    setShowAlert(false);

    setNotification(uploadingNotification);

    uploadGeolocation({...user, userData: geolocations}).then((res) => {
      setNotification(afterUploadNotification);

      dispatch(updateWaitingStatus(true));

      dispatch(updateLastUploadTime(new Date().getTime()));

      fetchStatusNow();
    });
  };

  const enableUpload = () => {
    const currentTime = new Date().getTime();
    const diff = currentTime - lastUploadTime;
    return diff > UPLOAD_DELAY;
  };

  const sendAlert = async () => {
    setShowAlert(true);
    // const currentTime = new Date().getTime();

    // const diff = currentTime - lastUploadTime;
    // if (diff > UPLOAD_DELAY) {
    //   setShowAlert(true);
    // } else {
    //   resetNotification();
    //   setNotification('Please wait for atleast 24hrs to upload again');
    // }
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
        {!status.status && (
          <View style={styles.message}>
            <Text style={styles.messageText}>
              Your location data is being gathered.
            </Text>
            <Text style={styles.messageText}>
              We recommend you not to close the app or disable GPS location
              sharing, for unambiguous results.
            </Text>
          </View>
        )}
        {status.status && (
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
              {status.status.toLowerCase() === 'high' && <HighText />}
              {status.status.toLowerCase() === 'mid' && <MidText />}
              {status.status.toLowerCase() === 'low' && <LowText />}
            </View>
          </View>
        )}
        {status.intersections && !!status.intersections.length && (
          <>
            <View style={styles.exposureHeaderTextContainer}>
              <Text style={[styles.messageText, [{textAlign: 'left'}]]}>
                Your potential exposure(s)
              </Text>
            </View>
            <View style={styles.locationsContainer}>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View style={styles.body}>
                  {status.intersections.map(({timestamp, lat, long}, index) => (
                    <Location
                      key={`key-${timestamp + index}`}
                      time={timestamp}
                      location={`Lat-${lat}, Long-${long}`}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </SafeAreaView>
      <View style={styles.upload}>
        <Button
          handlerPress={sendAlert}
          label="Assess My Risk"
          disabled={!enableUpload()}
        />
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
  message: {
    padding: 20,
    paddingTop: 200,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  messageText: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Helvetica Neue',
    color: '#343C41',
  },
  headText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exposureHeaderTextContainer: {
    marginTop: 10,
  },
  locationsContainer: {
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
    maxHeight: 150,
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
