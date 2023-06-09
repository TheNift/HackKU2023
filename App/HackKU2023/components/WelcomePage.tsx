import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Text } from 'react-native-paper';
import { FlipInEasyX } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient'

const windowDimensions = Dimensions.get('window');

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#fff', '#FFE180', '#f46e44']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        style={styles.background}
      />
      <View style={styles.buttons}>
        <Text variant="displayMedium">Ring Tavern</Text>
        <Text variant="bodyMedium" style={{padding: 8}}>Welcome to Ring Tavern, the circular contact manager! Keep your allies, acquaintances, and annoyances up to date on your info. Share with the world, or with only a few best friends. You've got control with Ring Tavern.</Text>
        <View style={styles.button}>
          <Button mode='contained' onPress={() => navigation.navigate('Sign In')}>Sign In</Button>
        </View>
        <View style={styles.button}>
          <Button mode='contained' onPress={() => navigation.navigate('Sign Up')}>Sign Up</Button>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    marginTop: 36,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  button: {
    marginTop: 10
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

export default WelcomeScreen;
