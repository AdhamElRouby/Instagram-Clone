import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useFollowUser = (userId) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuth();
  const { userProfile, setUserProfile } = useUserProfile();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    if (loading || !user) return;
    setLoading(true);
    try {
      const currUserRef = doc(db, 'users', user.uid);
      const userToFollowOrUnfollorRef = doc(db, 'users', userId);

      await updateDoc(currUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollorRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        // unfollow the user
        setUser({
          ...user,
          following: user.following.filter((uid) => uid !== userId),
        });
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers?.filter((uid) => uid !== user.uid),
          });
        }
      } else {
        // follow the user
        setUser({
          ...user,
          following: [...user.following, userId],
        });
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });
        }
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  return { isFollowing, loading, handleFollowUser };
};

export default useFollowUser;
