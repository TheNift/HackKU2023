import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref } from 'firebase/database';
import VisibilityPickerComponent from './VisibilityPickerComponent';

export default function StringTrait(props) {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.grow}
        label={props.name}
        value={props.value}
        onChangeText={text => props.onChangeValue(text)}
        mode='flat' />
      <VisibilityPickerComponent/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px'
  },
  grow: {
    flexGrow: 1
  }
});
