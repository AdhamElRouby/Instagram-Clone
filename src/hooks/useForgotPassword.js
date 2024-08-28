import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import useShowToast from './useShowToast';
import getFirebaseErrorMessage from '../utils/getFirebaseErrorMessage';

const useForgotPassword = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const showToast = useShowToast();

  const handlePasswordReset = async (email) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty)
      return showToast('Error', `${email} does not exist`, 'error');

    try {
      const success = await sendPasswordResetEmail(email);
      if (success)
        showToast(
          'Success',
          'A password-reset email has been sent. Please check your email',
          'success'
        );
      else showToast('Error', getFirebaseErrorMessage(error?.code), 'error');
    } catch (err) {
      showToast('Error', getFirebaseErrorMessage(error?.code), 'error');
    }
  };

  return { handlePasswordReset, sending };
};

export default useForgotPassword;
