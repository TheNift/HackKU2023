import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBb7ul-8pczdTnhc3lUWezZAJ0XCnBSVTs",
  authDomain: "tavern-contacts.firebaseapp.com",
  databaseURL: "https://tavern-contacts-default-rtdb.firebaseio.com",
  projectId: "tavern-contacts",
  storageBucket: "tavern-contacts.appspot.com",
  messagingSenderId: "215755819022",
  appId: "1:215755819022:web:3fc53d342eee284ebed45f"
};

const app = initializeApp(firebaseConfig);

export { app }
