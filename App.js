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
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'Picker',
      'AsyncStorage',
      'FlatList',
    ]);
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppDrawer />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
