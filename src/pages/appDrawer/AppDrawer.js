import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../home/Home';
import Register from '../register/Register';
import {About} from '../about/About';

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{activeTintColor: '#006BB6'}}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Register} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};
