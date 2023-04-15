import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { auth, database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import { set, ref } from 'firebase/database';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import getUid from '../backend/getUid';

export default function FollowUsernamePopup(props) {
  const [value, setValue] = React.useState({
    username: '',
    error: ''
  })

  const { user } = useAuthentication();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => props.exit()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a User</Text>

          {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

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

          <Button mode="outlined">Follow</Button>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={async () => {
              if (user) {
                if (value.username === '') {
                  setValue({
                    ...value,
                    error: 'Cannot add empty username.'
                  })
                  return;
                }

                var uid = await getUid(value.username);
                if (uid == undefined) {
                  setValue({
                    ...value,
                    error: 'User does not exist.'
                  })
                  return;
                }
                
                set(ref(database, 'follows/' + user.uid + '/' + uid), true);
                props.exit()
              }
            }}>
            <Text style={styles.textStyle}>Follow</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
