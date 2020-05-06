import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const cfgfirebase = {
    apiKey: "AIzaSyAsmHlxFv1Rps3nRXw0J9f9_hkkDPrBFlE",
    authDomain: "royals-db.firebaseapp.com",
    databaseURL: "https://royals-db.firebaseio.com",
    projectId: "royals-db",
    storageBucket: "royals-db.appspot.com",
    messagingSenderId: "184169010670",
    appId: "1:184169010670:web:90cc03a6173ba5f457eaff",
    measurementId: "G-L85640FFBQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        } catch (error) {
          console.log('error creating user', error.message);
        }
      }

      return userRef;
  };

  firebase.initializeApp(cfgfirebase);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ promt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


