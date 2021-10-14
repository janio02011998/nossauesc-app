import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAeDo4xqwJ7sDc6bdCSo9q1BfRboAIoAmc",
  authDomain: "nossa-uesc.firebaseapp.com",
  projectId: "nossa-uesc",
  storageBucket: "nossa-uesc.appspot.com",
  messagingSenderId: "414663250095",
  appId: "1:414663250095:web:0eac884c44abac5804445a",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const Auth = firebase.auth();

export { Auth };
