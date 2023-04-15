import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TavernPage from './components/TavernPage';

export default class App extends React.Component {
  state = {
    page: 'login'
  };
  
  render() {
    return (
      <TavernPage></TavernPage>
    )
  };
}
