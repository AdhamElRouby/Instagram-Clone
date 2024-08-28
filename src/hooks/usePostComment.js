import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useShowToast from './useShowToast';

const usePostComment = () => {
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();
  const { addComment } = usePosts();
  const showToast = useShowToast();

  const handlePostComment = async (postId, comment) => {
    if (loading) return;
    if (!authUser)
      return showToast('Error', 'You must be logged in to comment', 'error');
    setLoading(true);

    const newComment = {
      id: `${comment.substring(0,10)}/${authUser.uid}/${Date.now()}/${
        Math.floor(Math.random() * 1000) + 1
      }`,
      comment,
      postId,
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      await updateDoc(doc(db, 'posts', postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handlePostComment };
};

export default usePostComment;
