/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  StatusBar,
} from 'react-native';
import t from 'tcomb-form-native'
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,DefaultTheme} from '@react-navigation/stack';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {useBackgroundGeolocation,getPersonStatus,clearCache,uploadData} from './useBackgroundGeolocation';
import {Register} from './Register'
import Friends from './Friends'

const Form = t.form.Form;

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
})
const User = t.struct({
  YOB: t.String,
  gender: Gender,
  mobileNumber: t.String,
  terms: t.Boolean,


});



const App: () => React$Node = () => {

  useEffect(() => {
      SplashScreen.hide();
    }, []);


  const [geolocations] = useBackgroundGeolocation();
  const [status] = getPersonStatus();

  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen
              name="Registration"
              component={Register}
              options={{title: 'Registration', headerStyle: {backgroundColor: '#006BB6',height:50},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
              }
              }}

            />
            <Stack.Screen name="Friends" component={Friends}
            options={{title: 'Status', headerStyle: {backgroundColor: '#006BB6',height:50},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
              margin:20
              }
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
  );
};

const styles = StyleSheet.create({

  containerTop: {

        backgroundColor: '#ffffff',
    },

  container: {
      opacity:0,
      justifyContent: 'center',
      marginTop: 50,
      padding: 20,
      backgroundColor: '#ffffff',
  },

  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.blue,
    padding:20
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
