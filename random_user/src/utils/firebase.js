import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCF7JNJtMXebObBDjModj-8cTPOxduWgXk",
  authDomain: "frontier-test-d992b.firebaseapp.com",
  projectId: "frontier-test-d992b",
  storageBucket: "frontier-test-d992b.appspot.com",
  messagingSenderId: "458052421984",
  appId: "1:458052421984:web:d0e4d2680a74c6d967b605",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
