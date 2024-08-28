import { useState } from 'react';
import useShowToast from './useShowToast';

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const maxFileSize = 5 * 1024 * 1024; // 5 MB
  const showToast = useShowToast();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file?.size > maxFileSize) {
      showToast(
        'Image too large!',
        'Please select a profile picture under 2 MB.',
        'error'
      );
      return setSelectedFile(null);
    }
    setSelectedFile(file);
  };

  return { selectedFile, setSelectedFile, handleImageUpload };
};

export default usePreviewImage;
