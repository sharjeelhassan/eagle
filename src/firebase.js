import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyCLjyM4W35YK0-nWuV2MJ2e4sAp_SBJ5hY',
  authDomain: 'cizerra-eagle.firebaseapp.com',
  databaseURL: 'https://cizerra-eagle.firebaseio.com',
  projectId: 'cizerra-eagle',
  storageBucket: 'cizerra-eagle.appspot.com',
  messagingSenderId: '148973325469',
  appId: '1:148973325469:web:20317717128b98e8d89874',
  measurementId: 'G-NTDTSE9HBB',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
