import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  getUserDetails,
  STATUS_COLORS,
  convertTimestampToDate,
} from '../../utils';
import {Location} from '../../components/Location';
import {useGeolocation} from '../../hooks/useGeolocation';
import {uploadGeolocation} from './uploadGeolocation';
import {useGetStatus, startFetchingStatus} from '../../hooks/useGetStatus';

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const user = await getUserDetails();
      if (!user) {
        navigation.navigate('Registration');
      }
    })();
  });

  const geolocations = useGeolocation();

  const status = useGetStatus();

  const handlerUploadPress = () => {
    uploadGeolocation(geolocations);
    startFetchingStatus();
  };

  const sendAlert = () => {
    Alert.alert(
      'Attention!',
      'We will share your location data and will fetch your intersections with infected people. Do you wish to proceed?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => handlerUploadPress()},
      ],
    );
  };

  const circleStyles = (color) => {
    return {...styles.circle, borderColor: color};
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.mainContainer}>
        {status && (
          <View style={styles.containerTop}>
            <Text style={styles.headText}>Risk factor</Text>
            <View
              style={circleStyles(STATUS_COLORS[status.status.toLowerCase()])}>
              <Text style={{color: STATUS_COLORS[status.status.toLowerCase()]}}>
                {status.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.intersectionText}>
              Total Intersection: {status.numberIntersections}
            </Text>
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
        <View style={styles.upload}>
          <Button title="UPLOAD" onPress={sendAlert} />
        </View>
      </SafeAreaView>
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
  },
  containerTop: {
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  circle: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  intersectionText: {
    alignSelf: 'center',
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
    width: 150,
    marginTop: 20,
    alignSelf: 'center',
  },
});
