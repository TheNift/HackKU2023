import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';  
import { Button } from 'react-native-elements';
import { signOut } from 'firebase/auth'
import { auth } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function TavernPage() {
  const { user } = useAuthentication();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>Adventurers for {user?.email}</Text>
        </View>
        <Button title="Sign Out" onPress={() => signOut(auth)} />
        <ScrollView>
          <View style={styles.adventurersWrapper}>
            <View>
              <Text>Questless</Text>
            </View>
            <View>
              <Text>Busy Questing...</Text>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="auto" />  
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeHeader: {
    width: windowDimensions.width,
    borderColor: '#000',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',      
  },
  headerText: {
    color: '#000',
    fontSize: 32,
  },
  adventurersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});  
