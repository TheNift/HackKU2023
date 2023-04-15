import * as React from 'react';
import * as Firebase from './backend/Firebase';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import RootNavigation from './navigation/Index';

export default function App() {
  return (
    <RootNavigation />
  )
}
