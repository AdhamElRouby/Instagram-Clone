import { useState } from 'react';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useSearchUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const handleSearchUser = async (username) => {
    setLoading(true);
    setUser(null);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return showToast('Error', 'User not found', 'error');
      }
      const userProfileDoc = querySnapshot.docs[0].data();
      setUser(userProfileDoc);
    } catch (err) {
      showToast('Error', err.message, 'error');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, setUser, handleSearchUser };
};

export default useSearchUser;
