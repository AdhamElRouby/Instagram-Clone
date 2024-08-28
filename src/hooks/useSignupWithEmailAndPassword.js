import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuth } from '../context/AuthContext';
import getFirebaseErrorMessage from '../utils/getFirebaseErrorMessage';

const useSignupWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [myError, setMyError] = useState('');
  const { loginUser } = useAuth();

  useEffect(() => {
    if (error) setMyError(getFirebaseErrorMessage(error.code));
  }, [error]);

  const signup = async (inputs) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', inputs.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) return setMyError('Username already exists');

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userDoc = {
        uid: newUser.user.uid,
        email: inputs.email,
        username: inputs.username,
        fullname: inputs.fullname,
        bio: '',
        profilePicURL: '',
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
      await setDoc(doc(db, 'users', newUser.user.uid), userDoc);
      loginUser(userDoc);
    } catch (error) {
      setMyError(error.message);
    }
  };

  return { loading, myError, signup };
};

export default useSignupWithEmailAndPassword;
