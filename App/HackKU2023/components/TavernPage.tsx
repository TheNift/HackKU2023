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
import getUid from '../backend/getUid';

const windowDimensions = Dimensions.get('window');

export default function TavernPage() {
  const { user } = useAuthentication();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.homeHeader}>
          <Text style={styles.headerText}>Adventurers for {user?.email}</Text>
        </View>
        <ScrollView>
          <View style={styles.adventurersWrapper}>
            <View>
              <Text style={styles.adventurersHeaderText}>Questless!</Text>
            </View>
            <View>
              <Text style={styles.adventurersHeaderText}>Busy Questing...</Text>
            </View>
          </View>
          <Button title="Sign Out" onPress={() => signOut(auth)} style={styles.signOut}/>
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
    width: windowDimensions.width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  adventurersHeaderText: {
    color: '#000',
    fontSize: 24,
  },
  signOut: {
    width: windowDimensions.width / 8,
    alignSelf: 'center',
  },
});  
