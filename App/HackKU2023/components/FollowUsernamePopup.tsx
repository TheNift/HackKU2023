import * as React from 'react';
import { Button, Dialog, Portal, HelperText, TextInput } from 'react-native-paper';
import { database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref } from 'firebase/database';

export default function FollowUsernamePopup(props) {
  const [value, setValue] = React.useState({
    username: '',
    error: ''
  })

  const { user } = useAuthentication();

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.exit}>
        <Dialog.Title>Follow User</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label='Username'
            value={value.username}
            onChangeText={text => setValue({ ...value, username: text })}
          />
          <HelperText type="error" visible={value.error != ''}>
            {value.error}
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={async () => {
              if (user) {
                if (value.username === '') {
                  setValue({
                    ...value,
                    error: 'Cannot add empty username.'
                  })
                  return;
                }

                var uid = await getUid(value.username);
                if (uid == undefined) {
                  setValue({
                    ...value,
                    error: 'User does not exist.'
                  })
                  return;
                }
                
                set(ref(database, 'follows/' + user.uid + '/' + uid), true);
                props.exit()
              }
            }}>Add</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
