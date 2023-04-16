import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
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
import { List, Surface, useTheme, Button, FAB, Divider, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import { signOut } from 'firebase/auth'
import { auth, database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import FollowUsernamePopup from './FollowUsernamePopup';
import ShareInfoPopup from './ShareInfoPopup';
import { StackScreenProps } from '@react-navigation/stack';
import { onChildAdded, ref, onValue, get } from 'firebase/database';
import { useFollowsList } from '../backend/useFollowsList';

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

const TavernPage = (params) => {
  const { user } = useAuthentication();
  const [followVisible, setFollowVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const theme = useTheme();

  const { follows } = useFollowsList();

  let updateFollows = useEffect(() => {
    if (Object.keys(follows).length == 0)
    {
      const followsRef = ref(database, 'follows/' + user?.uid);
    }
  });

  let renderUsers = (active: boolean) => { // paramater true for active users, false for busy users
    return Object.entries(follows)
      .map(([key, value]) => {
        return (
          <View key={key} style={styles.fullWidth}>
            <Divider />
            <List.Item
              title={value}
              onPress={() => {
              params.navigation.navigate('View User', {
                userid: key,
                username: value
              })}}>
            </List.Item>
            <Divider />
          </View>
          );
      });
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LinearGradient
            // Background Linear Gradient
            colors={['#fff', '#CBC3E3', '#baa7da']}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={styles.background}
          />
        <ScrollView>
          <View style={styles.adventurersWrapper}>
            <List.Section>
              <List.Subheader>Contacts</List.Subheader>
              {renderUsers(false)}
            </List.Section>
          </View>
        </ScrollView>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => { setFollowVisible(true)}}
          />
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
  background: {
    position: 'absolute',
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    width: windowDimensions.width,
    height: windowDimensions.height,
  },
  sectionHeader: {
    width: windowDimensions.width,
    backgroundColor: '#fff',
    marginLeft: -16,
    marginBottom: 16,
  },
  fullWidth: {
    width: windowDimensions.width
  }
});  

export default TavernPage;
