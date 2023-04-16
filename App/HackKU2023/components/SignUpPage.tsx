import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../backend/Firebase';
import { ref, set } from "firebase/database";
import { LinearGradient } from 'expo-linear-gradient'
import { Button, TextInput } from 'react-native-paper';

const windowDimensions = Dimensions.get('window');

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    username: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '' || value.username == '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      await signInWithEmailAndPassword(auth, value.email, value.password);
      set(ref(database, 'usernames/' + auth.currentUser?.uid), {
        username: value.username
      });
      navigation.navigate('Home');
    } catch (error) {
      setValue({
        ...value,
        error: error.message
      })
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
            // Background Linear Gradient
            colors={['#fff', '#FFE180', '#f46e44']}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={styles.background}
          />

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <View style={styles.wrapper}>
          <TextInput
            placeholder='Email'
            label='Email'
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>

        <View style={styles.wrapper}>
          <TextInput
            placeholder='Username'
            label='Username'
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
          />
        </View>

        <View style={styles.wrapper}>
          <TextInput
            placeholder='Password'
            label='Password'
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>

        <Button mode='contained' onPress={signUp}>Sign Up</Button>
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

  controls: {
    flex: 1,
    width: windowDimensions.width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    width: windowDimensions.width,
    height: windowDimensions.height,
  },
  wrapper: {
    marginBottom: 16,
    width: windowDimensions.width / 8 * 7,
  }
});

export default SignUpScreen;
