import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../context/UserProfileContext';
import useShowToast from './useShowToast';
import { storage, db } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const useEditProfile = () => {
  const [uploading, setUploading] = useState(false);
  const { user, setUser } = useAuth();
  const { setUserProfile } = useUserProfile();
  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (uploading || !user) return;
    setUploading(true);
    const storageRef = ref(storage, `profilePics/${user.uid}`);
    const userDocRef = doc(db, 'users', user.uid);

    try {
      let imageURL = '';
      if (selectedFile) {
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        imageURL = await getDownloadURL(uploadResult.ref);
      }
      const updatedUser = {
        ...user,
        username: inputs.username,
        fullname: inputs.fullname,
        bio: inputs.bio,
        profilePicURL: imageURL || user.profilePicURL,
      };
      await updateDoc(userDocRef, updatedUser);
      setUser(updatedUser);
      setUserProfile(updatedUser);
      showToast('Success', 'Profile updated successfully', 'success');
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  return { editProfile, uploading };
};

export default useEditProfile;
