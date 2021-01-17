import firebase from 'firebase/app';
import 'firebase/firestore';
import store from './store'
require('firebase/auth');

const app = firebase.initializeApp({
  apiKey: "AIzaSyAkUO93rM06PfFWiUTsIVciuXgI45Boojo",
  authDomain: "recad-13bfc.firebaseapp.com",
  databaseURL: "https://recad-13bfc.firebaseio.com",
  projectId: "recad-13bfc",
  storageBucket: "recad-13bfc.appspot.com",
  messagingSenderId: "239455868508",
  appId: "1:239455868508:web:23bfd7de2d6e8533b33899",
  measurementId: "G-RRV2R8X4EX"
});

export const db = app.firestore();
export const catechists = db.collection('catechists');
export const catechizing = db.collection('catechizing');
export const enrollment = db.collection('enrollment');
export const rooms = db.collection('rooms');
export const locations = db.collection('locations');
export const groups = db.collection('groups');
export const levels = db.collection('levels');
export const classes = db.collection('classes');
export const days = db.collection('days');
export const schedules = db.collection('schedules');

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});