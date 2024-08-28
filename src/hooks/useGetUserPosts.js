import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { useUserProfile } from '../context/UserProfileContext';
import { db } from '../firebase/firebase';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useGetUserPosts = () => {
  const [loading, setLoading] = useState(true);
  const { posts, setPosts } = usePosts();
  const { userProfile } = useUserProfile();
  const showToast = useShowToast();

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setLoading(true);
      setPosts([]);

      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('createdBy', '==', userProfile.uid));
        const querySnapshot = await getDocs(q);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (err) {
        showToast('Error', err.message, 'error');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [userProfile, setPosts, showToast]);

  return { loading, posts };
};

export default useGetUserPosts;
