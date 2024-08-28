import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import useShowToast from './useShowToast';

const useGoogleAuthSignIn = () => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const { loginUser } = useAuth();
  const showToast = useShowToast();

  const handleGoogleSignIn = async () => {
    try {
      const currUser = await signInWithGoogle();
      if (!currUser) return;
      const userRef = doc(db, 'users', currUser.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const userDoc = {
          uid: currUser.user.uid,
          email: currUser.user.email,
          username: currUser.user.email.split('@')[0],
          fullname: currUser.user.displayName,
          bio: '',
          profilePicURL: currUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(db, 'users', currUser.user.uid), userDoc);
        loginUser(userDoc);
      } else {
        loginUser(userSnap.data());
      }
    } catch (err) {
      showToast('Error', error.message, 'error');
    }
  };

  return { handleGoogleSignIn };
};

export default useGoogleAuthSignIn;
