import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useGetFeedPosts = () => {
  const [loading, setLoading] = useState(true);
  const { user: authUser } = useAuth();
  const { posts, setPosts } = usePosts();
  const showToast = useShowToast();
  const introPostID = import.meta.env.VITE_INTRO_POST_ID;

  useEffect(() => {
    const getFeedPosts = async () => {
      if (!authUser) return;
      setLoading(true);

      try {
        if (authUser.following.length === 0) {
          setLoading(false);
          const postRef = await getDoc(doc(db, 'posts', introPostID));
          if (postRef.exists()) {
            setPosts([{ ...postRef.data(), id:introPostID }]);
          }
          return;
        }
        const q = query(
          collection(db, 'posts'),
          where('createdBy', 'in', authUser.following)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setLoading(false);
          const postRef = await getDoc(doc(db, 'posts', introPostID));
          if (postRef.exists()) {
            setPosts([{ ...postRef.data(), id:introPostID }]);
          }
          return;
        }
        const sposts = [];
        querySnapshot.forEach((doc) => {
          sposts.push({ ...doc.data(), id: doc.id });
        });
        sposts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(sposts);
      } catch (err) {
        showToast('Error', err.message, 'error');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [authUser, showToast, setPosts, introPostID]);

  return { loading, posts };
};

export default useGetFeedPosts;
