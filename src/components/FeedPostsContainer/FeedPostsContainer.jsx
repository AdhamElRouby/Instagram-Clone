import { Container, Text } from '@chakra-ui/react';
import Post from './Post';
import PostSkeleton from './PostSkeleton';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';
import './FeedPostsContainer.scss';

const FeedPostsContainer = () => {
  const { posts, loading } = useGetFeedPosts();

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {loading &&
        Array.from({ length: 4 }).map((_, idx) => <PostSkeleton key={idx} />)}
      {!loading &&
        posts.length > 0 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
      {!loading && posts.length === 0 && (
        <Text fontSize={'2xl'}>No posts to display.</Text>
      )}
    </Container>
  );
};

export default FeedPostsContainer;
