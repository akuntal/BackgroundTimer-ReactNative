import { createStackNavigator } from 'react-navigation-stack';
import {Register} from './Register';
import Friends from './Friends';

const AppNavigator = createStackNavigator({
  Register: { screen: Register },
  Friends: { screen: Friends},
});

export default AppNavigator;