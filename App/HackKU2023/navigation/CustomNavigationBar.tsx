import * as React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { useAuthentication } from '../backend/useAuthentication';
import { auth } from '../backend/Firebase';
import { signOut } from 'firebase/auth';

export default function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  const user = useAuthentication();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {user != undefined &&
        <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
          />
        }>
          <Menu.Item
            onPress={() => signOut(auth)}
            title="Sign Out"
          />
        </Menu>
      }
    </Appbar.Header>
  );
}
