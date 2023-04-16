import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context'; 
import { List, Surface, useTheme, Button, FAB, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'
import { Alert } from 'react-native';

const windowDimensions = Dimensions.get('window');

const tempUserArray = [
    {
        level0: {
            "12123": {
                name: 'Address',
                value: '1123 Lane',
            },
            "98342": {
                name: 'Name',
                value: 'John Doe',
            }
        },
        level1: {
            "91657": {
                name: 'Twitter',
                value: '@bruh',
            },
            "91732": {
                name: 'Instagram',
                value: '@john_doe',
            }
        },
        level2: {
            "9163": {
                name: 'Phone',
                value: '(123)456-7890'
            }
        },
        level3: {
            "42391": {
                name: 'Email',
                value: 'johndoe@hotmail.com'
            }
        },
        level4: {
            "71032": {
                name: 'Facebook',
                value: '@johnniedoseph'
            }
        },
    }
];

const ViewUserPage = ({navigation, route}) => {
    let parseUser = (request: string) => {
        let returnVal;
        for(let i in tempUserArray) {
            for(let j in tempUserArray[i]) {
               for(let x in tempUserArray[i][j]) {
                    if(request == tempUserArray[i][j][x]["name"]) {
                        returnVal = tempUserArray[i][j][x]["value"];
                    }
               }
            }
        }
        return returnVal;
    }

    let organizeUserData = () => {
        let datapoints = ["Name","Email","Address","Phone","Twitter","Instagram","Facebook"];
        return datapoints.map((point) => {
            let result = parseUser(point);
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