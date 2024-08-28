/* eslint-disable react-refresh/only-export-components */
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const createPost = (post) => {
    setPosts([post, ...posts]);
  };
  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const addComment = (postId, commentObj) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId)
          return { ...post, comments: [...post.comments, commentObj] };
        return post;
      })
    );
  };

  const likePost = (postId, userId, isLiked) => {
    setPosts(
      posts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          likes: !isLiked
            ? [...post.likes, userId]
            : post.likes.filter((uid) => uid !== userId),
        };
      })
    );
  };

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, createPost, deletePost, addComment, likePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
