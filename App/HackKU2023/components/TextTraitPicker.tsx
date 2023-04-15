import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';

export default function TextTraitPicker(props) {
  const [trait, setTrait] = React.useState({
    value: 'Name',
    list: [
      { _id: 'name', value: 'Name' },
      { _id: 'phone', value: 'Phone' },
      { _id: 'email', value: 'Email' },
    ],
    selectedList: [{ _id: 'name', value: 'Name' }],
    error: '',
  });

  return (
    <View style={styles.container}>
      <View style={styles.grow}>
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
      <Button onPress={() => props.traitPicked(trait.selectedList[0])}>Add Trait</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1
  },
  spacing: {
    marginBottom: 12
  }
});

