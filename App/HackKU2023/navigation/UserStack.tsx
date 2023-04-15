import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomNavigationBar from './CustomNavigationBar';
import TavernPage from '../components/TavernPage';
import SelfEditPage from '../components/SelfEditPage';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />
        }}>
        <Stack.Screen name="Home" component={TavernPage} />
        <Stack.Screen name="Me" component={SelfEditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
