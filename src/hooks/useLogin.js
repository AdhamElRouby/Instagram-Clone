import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const useLogin = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { loginUser } = useAuth();

  const login = async (inputs) => {
    try {
      const currUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!currUser) return;
      const userRef = doc(db, 'users', currUser.user.uid);
      const userSnap = await getDoc(userRef);
      loginUser(userSnap.data());
    } catch (err) {
      console.log(err);
    }
  };

  return { login, loading, error };
};

export default useLogin;
