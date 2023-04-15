import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBb7ul-8pczdTnhc3lUWezZAJ0XCnBSVTs",
  authDomain: "tavern-contacts.firebaseapp.com",
  databaseURL: "https://tavern-contacts-default-rtdb.firebaseio.com",
  projectId: "tavern-contacts",
  storageBucket: "tavern-contacts.appspot.com",
  messagingSenderId: "215755819022",
  appId: "1:215755819022:web:3fc53d342eee284ebed45f"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const database = getDatabase(firebaseApp);
const dbRef = ref(getDatabase());

export {
  firebaseApp,
  auth,
  database,
  dbRef
};
