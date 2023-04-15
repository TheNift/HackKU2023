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
    <TextInput
      style={styles.spacing}
      label={props.name}
      value={props.value}
      onChangeText={text => props.onChangeValue(text)}
      mode='flat' />
  )
};

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 12
  }
});
