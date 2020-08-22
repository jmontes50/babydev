import firebase from 'firebase';
import 'firebase/storage';
const config = {
  apiKey: "AIzaSyBSpA4ubvJAlmmzFA68wbYpSLJyqA6WjgE",
    authDomain: "babydev-3aa07.firebaseapp.com",
    databaseURL: "https://babydev-3aa07.firebaseio.com",
    projectId: "babydev-3aa07",
    storageBucket: "babydev-3aa07.appspot.com",
    messagingSenderId: "697143707405",
    appId: "1:697143707405:web:62f356dc19ccf27a3dd244"
}

const fire = firebase.initializeApp(config);
const storage = firebase.storage();

export {
  storage,
  fire as default,
  firebase
}