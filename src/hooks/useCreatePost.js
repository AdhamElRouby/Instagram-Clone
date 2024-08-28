import { useState } from 'react';
import { storage, db } from '../firebase/firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import { useUserProfile } from '../context/UserProfileContext';
import { useLocation } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useShowToast from './useShowToast';

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { user: authUser } = useAuth();
  const { addPost, userProfile } = useUserProfile();
  const { createPost } = usePosts();
  const { pathname } = useLocation();
  const showToast = useShowToast();

  const handleCreatePost = async (selectedFile, caption) => {
    if (!selectedFile) throw new Error('Please select an image');
    setLoading(true);

    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
      imgURL: '',
    };

    try {
      // add the new post to the posts collection
      const postDocRef = await addDoc(collection(db, 'posts'), newPost);
      // add the new post id to the authUser.posts
      const authUserRef = doc(db, 'users', authUser.uid);
      await updateDoc(authUserRef, { posts: arrayUnion(postDocRef.id) });
      // upload the image to firebase storage
      const storageRef = ref(storage, `posts/${postDocRef.id}`);
      const uploadResult = await uploadBytes(storageRef, selectedFile);
      const imgURL = await getDownloadURL(uploadResult.ref);
      // update the new post in the posts collection after getting the image URL from the storage
      await updateDoc(postDocRef, { imgURL: imgURL });
      // update the front end
      newPost.imgURL = imgURL;
      if(userProfile?.uid === authUser?.uid) createPost({ newPost, id: postDocRef.id });
      if(pathname !== '/' && userProfile?.uid === authUser?.uid) addPost(postDocRef.id);
      // show success to the user
      showToast('Success', 'Post created successfully', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePost, loading };
};

export default useCreatePost;
