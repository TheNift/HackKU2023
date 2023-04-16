import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import SelfEditPage from './SelfEditPage';
import TavernPage from './TavernPage';

const HomePageNav = ({navigation, route}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allies', title: 'Allies', focusedIcon: 'heart'},
    { key: 'me', title: 'Me', focusedIcon: 'album' },
  ]);

  const renderScene = ({ route, jumpTo })  => {
    switch (route.key) {
      case 'allies':
        return <TavernPage navigation={navigation} jumpTo={jumpTo} />;
      case 'me':
        return <SelfEditPage jumpTo={jumpTo} />;
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#99343b',
  }
});

export default HomePageNav;