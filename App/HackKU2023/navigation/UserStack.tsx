import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from './CustomNavigationBar';
import TavernPage from '../components/TavernPage';
import SelfEditPage from '../components/SelfEditPage';
import HomePageNav from '../components/HomePage';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />
        }}>
        <Stack.Screen name="Home" component={HomePageNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
