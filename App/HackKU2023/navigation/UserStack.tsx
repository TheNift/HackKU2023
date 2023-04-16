import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from './CustomNavigationBar';
import TavernPage from '../components/TavernPage';
import SelfEditPage from '../components/SelfEditPage';
import HomePageNav from '../components/HomePage';
import ViewUserPage from '../components/ViewUserPage';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tavern"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />
        }}>
        <Stack.Screen name="Tavern" component={HomePageNav} />
        <Stack.Screen name="View User" component={ViewUserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
