import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword } 
        from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAU6g2Iz1-VlC3YwrXAcictW0voVb5ERXY",
    authDomain: "clothing-db-d4218.firebaseapp.com",
    projectId: "clothing-db-d4218",
    storageBucket: "clothing-db-d4218.appspot.com",
    messagingSenderId: "717636691223",
    appId: "1:717636691223:web:bff44c6fa5dc2fc34f8352"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWIthGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};