import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, TextInput } from 'react-native-paper';
import { FlipInEasyX } from 'react-native-reanimated';

const windowDimensions = Dimensions.get('window');

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
            // Background Linear Gradient
            colors={['#fff', '#CBC3E3', '#baa7da']}
            start={[0.5, 0]}
            end={[0.5, 1]}
            style={styles.background}
          />

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        {/* <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        /> */}

        <View style={styles.wrapper}>
          <TextInput
            placeholder='Email'
            label='Email'
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>

        {/* <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        /> */}

        <View style={styles.wrapper}>
          <TextInput
            placeholder='Password'
            label='Password'
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>
        

        <Button mode='contained' onPress={signIn}>Sign In</Button>
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
    marginTop: 10,
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

export default SignInScreen;
