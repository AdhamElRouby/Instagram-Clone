/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const addPost = (postId) => {
    setUserProfile({
      ...userProfile,
      posts: [postId, ...userProfile.posts],
    });
  };

  const deleteUserProfilePost = (postId) => {
    setUserProfile({
      ...userProfile,
      posts: userProfile.posts.filter((pid) => pid !== postId),
    });
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, addPost, deleteUserProfilePost }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
