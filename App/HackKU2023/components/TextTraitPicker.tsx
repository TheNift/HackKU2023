import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { LinearGradient } from 'expo-linear-gradient'
import {
  SafeAreaView,
  SafeAreaProvider
} from 'react-native-safe-area-context';  

const windowDimensions = Dimensions.get('window');

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
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
    </SafeAreaProvider>
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
  },
  background: {
    position: 'absolute',
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    width: windowDimensions.width,
    height: windowDimensions.height,
  },
  noBackground: {
    backgroundColor: 'none',
  }
});

