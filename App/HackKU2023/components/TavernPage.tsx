import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable
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
import FollowUsernamePopup from './FollowUsernamePopup';

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
  const [followVisible, setFollowVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

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
          <Text style={styles.headerText}>Adventurers</Text>
          <View style={styles.headerButtonBox}>
            <Pressable style={styles.headerButton}/>
            <Pressable style={styles.headerButton}/>
          </View>
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
          <Button title="Follow" onPress={() => {
            setFollowVisible(true)
          }}/>
        </ScrollView>
        <FollowUsernamePopup visible={followVisible} exit={() => setFollowVisible(false)}></FollowUsernamePopup>
        <StatusBar style="auto" />  
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#E8DCB8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  homeHeader: {
    width: windowDimensions.width,
    borderColor: '#000',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,   
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
  headerButtonBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerButton: {
    width: 48,
    height: 48,
    borderColor: '#000',
    borderWidth: 1,
    marginLeft: 8,
  }
});  
