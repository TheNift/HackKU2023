import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export default function VisibilityPickerComponent(props) {
  const [value, setValue] = React.useState('0');

  return (
    <SegmentedButtons
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onChangeValue(parseInt(value));
      }}
      buttons={[
        {
          value: '0',
          label: 'Public'
        },
        {
          value: '1',
          label: 'Village'
        },
        {
          value: '2',
          label: 'Guild'
        },
        {
          value: '3',
          label: 'Party'
        }
      ]}
    />
  );
};
