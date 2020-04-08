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
import {createStackNavigator} from '@react-navigation/stack';

import {Register} from './src/pages/register/Register';
import Home from './src/pages/home/Home';
import {YellowBox} from 'react-native';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
    YellowBox.ignoreWarnings(['Setting a timer', 'Picker', 'AsyncStorage']);
  }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'HCL',
            headerStyle: {backgroundColor: '#006BB6', height: 50},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              margin: 20,
            },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Register}
          options={{
            title: 'Registration',
            headerStyle: {backgroundColor: '#006BB6', height: 50},
            headerTintColor: '#fff',
            headerLeft: null,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
