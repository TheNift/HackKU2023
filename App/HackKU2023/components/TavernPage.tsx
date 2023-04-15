import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';  

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default class TavernPage extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.homeHeader}>
            <Text style={styles.headerText}>Adventurers</Text>
          </View>
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
}

const styles = StyleSheet.create({
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
