import * as React from 'react';
import * as Firebase from './backend/Firebase';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import RootNavigation from './navigation/Index';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    dark: false,
    primary: '#99343b',
    accent: '#99343b',
    text: '#000',
    background: '#fff',
    surface: '#fff',
    backdrop: '#99343b',
    onSurface: '#99343b',
    disabled: '#99343b',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <RootNavigation />
    </PaperProvider>
  )
}
