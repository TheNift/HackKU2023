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
// import { Button } from 'react-native-elements';
import { List, Surface, useTheme, Button, FAB } from 'react-native-paper';
import { signOut } from 'firebase/auth'
import { auth } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import FollowUsernamePopup from './FollowUsernamePopup';
import ShareInfoPopup from './ShareInfoPopup';

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
  const [shareVisible, setShareVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const theme = useTheme();

  let renderUsers = (active: boolean) => { // paramater true for active users, false for busy users
    if(active == true) {
      return tempUserArray.map((user) => {
        return (
          <Surface key={user.key} style={styles.surface} elevation={2} mode='elevated'>
            <Text style={styles.adventurerNameText}>{user.name}</Text>
          </Surface>
        );
      });
    } else if (active == false) {
      return tempUserArray.map((user) => {
        return (
          <Surface key={user.key} style={styles.surface} elevation={2} mode='elevated'>
            <Text style={styles.adventurerNameText}>{user.name}</Text>
          </Surface>
        );
      });
    } else {
      return(null);
    }
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => { setFollowVisible(true)}}
          />
        </ScrollView>
        <FollowUsernamePopup visible={followVisible} exit={() => setFollowVisible(false)}></FollowUsernamePopup>
        <ShareInfoPopup visible={shareVisible} exit={() => setShareVisible(false)}></ShareInfoPopup>
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
    paddingLeft: 16,
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
    marginBottom: 8,
    marginTop: 12,
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
  },
  surface: {
    width: 80,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});  
