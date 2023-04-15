import { database, dbRef } from "./Firebase";
import { ref, child, get, query, orderByChild, equalTo, onValue } from "firebase/database";

export default async function(name: string) {
  return new Promise(resolve => {
    let usernamesQuery = query(ref(database, 'usernames'), orderByChild('username'), equalTo(name));
    onValue(usernamesQuery, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        resolve(childSnapshot.key)
      });
    }, {
      onlyOnce: true
    });
  })
}
