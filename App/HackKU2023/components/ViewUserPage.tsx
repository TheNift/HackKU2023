import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context'; 
import { List, Surface, useTheme, Button, FAB, Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'

const windowDimensions = Dimensions.get('window');

const tempUserArray = [
    {
        level0: {
            12123: {
                name: 'Address',
                value: '1123 Lane',
            },
            98342: {
                name: 'Name',
                value: 'John Doe',
            }
        },
        level1: {
            91657: {
                name: 'Twitter',
                value: '@bruh',
            },
            91732: {
                name: 'Instagram',
                value: '@john_doe',
            }
        },
        level2: {
            9163: {
                name: 'Phone',
                value: '(123)456-7890'
            }
        },
        level3: {
            42391: {
                name: 'Email',
                value: 'johndoe@hotmail.com'
            }
        },
        level4: {
            71032: {
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
                if(j[0] == request) {
                    returnVal = j[1];
                }
            }
        }
        return returnVal;
    }
    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#fff', '#CBC3E3', '#baa7da']}
                    start={[0.5, 0]}
                    end={[0.5, 1]}
                    style={styles.background}
                />
                <Avatar.Image size={24} source={require('../assets/adaptive-icon.png')}/>
                <Text>{parseUser('Name')}</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#fff',
      flexDirection: 'row',
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
  });  
  
  export default ViewUserPage;