import ProfilePost from './ProfilePost';
import { Container, Skeleton, Text } from '@chakra-ui/react';
import useGetUserPosts from '../../hooks/useGetUserPosts';

const ProfilePostsContainer = () => {
  const { loading, posts } = useGetUserPosts();
  const noPostsFound = !loading && posts.length === 0;

  if (noPostsFound)
    return (
      <Container mt={6} textAlign={'center'}>
        <Text fontSize={'2xl'}>No posts to display.</Text>
      </Container>
    );

  return (
    <div className="profile-posts-grid">
      {loading &&
        Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} w={'full'} height={'300px'} />
        ))}
      {!loading &&
        posts.map((post) => <ProfilePost post={post} key={post.id} />)}
    </div>
  );
};

export default ProfilePostsContainer;
