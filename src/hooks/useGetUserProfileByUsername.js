import { useState, useEffect } from 'react';
import useShowToast from './useShowToast';
import { useUserProfile } from '../context/UserProfileContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetUserProfileByUsername = (username) => {
  const [loading, setLoading] = useState(false);
  const { userProfile, setUserProfile } = useUserProfile();
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfileByUsername = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return setUserProfile(null);
        const userProfileDoc = querySnapshot.docs[0].data();
        setUserProfile(userProfileDoc);
      } catch (err) {
        showToast('Error', err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    getUserProfileByUsername();
  }, [username, showToast, setUserProfile]);

  return { userProfile, loading };
};

export default useGetUserProfileByUsername;
