import * as React from 'react';
import { database } from './Firebase'
import { useAuthentication } from './useAuthentication';
import { onChildAdded, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

var lastUser = undefined;
var globalFollows = {};

export function useFollowsList() {
  const { user } = useAuthentication();

  const [follows, setFollows] = React.useState({});

  if (user?.uid != lastUser) {
    lastUser = user?.uid;
    const followsRef = ref(database, 'follows/' + user?.uid);
    let unsubscribeFromChildAdded = onChildAdded(followsRef, async (data) => {
      const uid = data.key?.toString();
      const usernameRef = ref(database, 'usernames/' + uid);
      get(usernameRef).then((snapshot) => {
        globalFollows[uid] = snapshot.val()['username'];
        setFollows({...follows, ...globalFollows});
      });
    });
  }

  return {
    user,
    follows
  }
}
