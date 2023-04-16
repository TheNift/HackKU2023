import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context'; 
import { List, Surface, useTheme, Button, FAB, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import { database } from '../backend/Firebase';
import { ref, get } from 'firebase/database';
import { Alert } from 'react-native';
import traitlist from '../backend/traitlist';

const windowDimensions = Dimensions.get('window');

var lastUid = undefined;

const ViewUserPage = ({navigation, route}) => {
    let [level0Data, setLevel0Data] = React.useState({});
    let [level1Data, setLevel1Data] = React.useState({});
    let [level2Data, setLevel2Data] = React.useState({});
    let [level3Data, setLevel3Data] = React.useState({});

    let downloadUser = React.useEffect(() => {
        var uid = route.params.userid;
        if (uid != lastUid)
        {
            lastUid = uid;
            var username = route.params.username;
            get(ref(database, 'level0/' + uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    setLevel0Data(snapshot.val());
                }
            });
            get(ref(database, 'level1/' + uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    setLevel1Data(snapshot.val());
                }
            });
            get(ref(database, 'level2/' + uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    setLevel2Data(snapshot.val());
                }
            });
            get(ref(database, 'level3/' + uid)).then((snapshot) => {
                if (snapshot.exists()) {
                    setLevel3Data(snapshot.val());
                }
            });
        }
    });

    let parseUser = (request: string) => {
        let getIn = (levelData) => {
            for(let j in levelData) {
                if(levelData[j]['name'] == request) {
                    return levelData[j]['value'];
                }
            }
            return undefined;
        };

        let var0 = getIn(level0Data);
        if (var0) return var0;

        let var1 = getIn(level1Data);
        if (var1) return var1;

        let var2 = getIn(level2Data);
        if (var2) return var2;

        let var3 = getIn(level3Data);
        if (var3) return var3;

        return undefined;
    };

    let organizeUserData = () => {
        let datapoints = traitlist.map((trait) => trait.value);
        return datapoints.map((point) => {
            let result = parseUser(point);
            if (result == undefined) return null;
            
            return (
                <View key={point} style={styles.userInfo}>
                    <Text style={styles.userInfoText}><Text style={styles.bold}>{point}: </Text>{result}</Text>
                </View>
            );
        });
    };

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#fff', '#FFE180', '#f46e44']}
                    start={[0.5, 0]}
                    end={[0.5, 1]}
                    style={styles.background}
                />
                <Avatar.Image size={96} source={require('../assets/adaptive-icon.png')} style={styles.icon}/>
                <View>
                    {organizeUserData()}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
    },
    background: {
      position: 'absolute',
      zIndex: -1,
      flex: 1,
      alignItems: 'center',
      width: windowDimensions.width,
      height: windowDimensions.height,
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfoText: {
        fontSize: 16,
    },
    bold: {
        display: 'flex',
        fontSize: 16,
        fontWeight: "bold",
    },
    icon: {
        marginBottom: 24,
    }
  });
  
  export default ViewUserPage;
