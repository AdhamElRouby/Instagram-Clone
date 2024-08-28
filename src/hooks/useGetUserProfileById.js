import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetUserProfileById = (userId) => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfileById = async () => {
      setLoading(true);
      setUserProfile(null);

      try {
        const userRef = await getDoc(doc(db, 'users', userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (err) {
        showToast('Error', err.message, 'error');
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getUserProfileById();
  }, [showToast, userId]);

  return { loading, userProfile };
};

export default useGetUserProfileById;
