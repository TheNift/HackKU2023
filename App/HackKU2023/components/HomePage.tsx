import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SelfEditPage from './SelfEditPage';
import TavernPage from './TavernPage';

const HomePageNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'allies', title: 'Allies', focusedIcon: 'heart'},
    { key: 'me', title: 'Me', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    allies: TavernPage,
    me: SelfEditPage
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default HomePageNav;