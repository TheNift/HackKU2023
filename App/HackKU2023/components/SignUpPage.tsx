import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../backend/Firebase';
import { ref, set } from "firebase/database";

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
      <Text>Signup screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Username'
          containerStyle={styles.control}
          value={value.username}
          onChangeText={(text) => setValue({ ...value, username: text })}
          leftIcon={<Icon
            name='person'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
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
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;
