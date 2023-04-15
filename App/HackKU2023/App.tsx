import * as React from 'react';
import * as Firebase from './backend/Firebase';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import RootNavigation from './navigation/Index';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <RootNavigation />
    </PaperProvider>
  )
}
