/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {YellowBox} from 'react-native';
import {AppDrawer} from './src/pages/appDrawer/AppDrawer';
import {Header} from './src/components/Header';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Setting a timer', 'Picker', 'AsyncStorage']);
  }, []);

  return (
    <>
      <NavigationContainer>
        <AppDrawer />
      </NavigationContainer>
    </>
  );
};

export default App;
