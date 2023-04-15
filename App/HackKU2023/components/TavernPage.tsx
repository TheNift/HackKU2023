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

const tempUserArray = [
  {
    name: "user00",
    key: 'vybadlhva',
  },
  {
    name: "user01",
    key: 'nvjaahjl',
  },
  {
    name: "user02",
    key: 'avuniap',
  },
  {
    name: "user03",
    key: 'ghiupwwpt',
  },
  {
    name: "user04",
    key: 'u8jfqpjfpa',
  },
  {
    name: "user05",
    key: 'hfauepifauqp',
  },
  {
    name: "user06",
    key: 'jfieoaajfip',
  },
];

export default function TavernPage() {
  const { user } = useAuthentication();

  let renderUsers = (active: boolean) => { // paramater true for active users, false for busy users
    if(active == true) {
      return tempUserArray.map((user) => {
        return (
          <View key={user.key}>
            <Text style={styles.adventurerNameText}>{user.name}</Text>
          </View>
        );
      });
    } else if (active == false) {
      return tempUserArray.map((user) => {
        return (
          <View key={user.key}>
            <Text style={styles.adventurerNameText}>{user.name}</Text>
          </View>
        );
      });
    } else {
      return(null);
    }
  };
  
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
              {renderUsers(true)}
            </View>
            <View>
              <Text style={styles.adventurersHeaderText}>Busy Questing...</Text>
              {renderUsers(false)}
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
  adventurerNameText: {
    color: '#000',
    fontSize: 16,
  },
  signOut: {
    width: windowDimensions.width / 8,
    alignSelf: 'center',
  },
});  
