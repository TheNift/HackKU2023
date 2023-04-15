import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';

export default function TextTraitPicker(props) {
  const [trait, setTrait] = React.useState({
    value: 'Name',
    list: [
      { _id: '1', value: 'Name' },
      { _id: '2', value: 'Phone' },
      { _id: '3', value: 'Email' },
    ],
    selectedList: [],
    error: '',
  });

  return (
    <View>
      <PaperSelect
          label="Select Trait"
          value={trait.value}
          onSelection={(value: any) => {
            setTrait({
              ...trait,
              value: value.text,
              selectedList: value.selectedList,
              error: '',
            });
          }}
          arrayList={[...trait.list]}
          selectedArrayList={[...trait.selectedList]}
          multiEnable={false}
          hideSearchBox={true}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 12
  }
});

