import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useLikePost = (post) => {
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();
  const { likePost } = usePosts();
  const [isLiked, setIsLiked] = useState(post.likes?.includes(authUser?.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (!authUser)
      return showToast(
        'Error',
        'You must be logged in to like a post',
        'error'
      );
    if (loading) return;
    setLoading(true);

    try {
      // upadte the back end
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });
      // update front end
      likePost(post.id, authUser.uid, isLiked);
      setIsLiked(!isLiked);
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { handleLikePost, isLiked, loading };
};

export default useLikePost;
