// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf8QqR8tZVmGIS9i6UN6fhVbqVLXdQPKI",
  authDomain: "crwn-clothing-c1b67.firebaseapp.com",
  projectId: "crwn-clothing-c1b67",
  storageBucket: "crwn-clothing-c1b67.appspot.com",
  messagingSenderId: "1065687821693",
  appId: "1:1065687821693:web:6e945670a6ea89fab93014",
  measurementId: "G-TYBKHFMYQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //initialize the firebase app
export const db = getFirestore(app); //initialize the db
export const auth = getAuth(app);

//sign in with google config
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // check if the user is logged in

  const userRef = doc(db, `users/${userAuth.uid}`); // get the userRef
  const snapshot = await getDoc(userRef); // get the snapshot

  if (!snapshot.exists()) {
    // check if the authenticated user is in the firestore
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      }); // store this data in the firebase firesstore
      console.log("user created");
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }
  return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });  
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};
