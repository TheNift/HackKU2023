import * as React from 'react';
import { Button, Dialog, Portal, HelperText, TextInput } from 'react-native-paper';
import { database } from '../backend/Firebase';
import { useAuthentication } from '../backend/useAuthentication';
import getUid from '../backend/getUid';
import { set, ref } from 'firebase/database';
import VisibilityPickerComponent from './VisibilityPickerComponent';

export default function ShareInfoPopup(props) {
  const [value, setValue] = React.useState({
    username: '',
    visibility: 0,
    error: ''
  })

  const { user } = useAuthentication();

  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.exit}>
        <Dialog.Title>Share Traits</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label='Username'
            value={value.username}
            onChangeText={text => setValue({ ...value, username: text })}
          />
          <HelperText type="error" visible={value.error != ''}>
            {value.error}
          </HelperText>
          <VisibilityPickerComponent
            value={value.visibility}
            onChangeValue={(vis) => setValue({ ...value, visibility: vis })}
            />
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
                
                set(ref(database, 'levels/' + user.uid + '/' + uid), value.visibility);
                props.exit()
              }
            }}>Share</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
