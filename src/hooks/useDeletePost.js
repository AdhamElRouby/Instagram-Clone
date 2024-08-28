import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import { useUserProfile } from '../context/UserProfileContext';
import useShowToast from './useShowToast';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();
  const { deletePost } = usePosts();
  const { deleteUserProfilePost } = useUserProfile();
  const showToast = useShowToast();

  const handleDeletePost = async (post) => {
    // if (loading || !userProfile) return;
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);

    try {
      // const imgRef = ref(storage, `posts/${post.id}`);
      // await deleteObject(imgRef);
      const userRef = doc(db, 'users', authUser.uid);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      await deleteDoc(doc(db, 'posts', post.id));
      deletePost(post.id);
      deleteUserProfilePost(post.id);
      showToast('Success', 'Post deleted successfully', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleDeletePost };
};

export default useDeletePost;
