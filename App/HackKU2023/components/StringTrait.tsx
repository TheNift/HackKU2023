import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
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
      <Button
        icon="close"
        onPress={props.onRemove}/>
    </View>
  )
};

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 12
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
    marginBottom: 12
  },
});
