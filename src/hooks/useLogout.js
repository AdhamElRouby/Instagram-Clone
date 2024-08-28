import { auth } from '../firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { useAuth } from '../context/AuthContext';

const useLogout = () => {
  const [signOut, loading] = useSignOut(auth);
  const { logoutUser } = useAuth();
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      await signOut();
      logoutUser();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  return { handleLogout, loading };
};

export default useLogout;
