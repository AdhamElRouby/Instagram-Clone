import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetSuggestedUsers = () => {
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user: authUser } = useAuth();
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);

      try {
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef,
          where('uid', 'not-in', [authUser.uid, ...authUser.following]),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setSuggestedUsers(users);
      } catch (err) {
        showToast('Error', err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { loading, suggestedUsers };
};

export default useGetSuggestedUsers;
