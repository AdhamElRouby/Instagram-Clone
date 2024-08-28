import { Avatar, Button, Text } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAuth } from '../../context/AuthContext';
import useDeletePost from '../../hooks/useDeletePost';
import useFollowUser from '../../hooks/useFollowUser';

const ProfilePostModalHeader = ({ post }) => {
  const { userProfile } = useUserProfile();
  const { user: authUser } = useAuth();
  const { loading:isDeleting, handleDeletePost } = useDeletePost();
  const { isFollowing, loading, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  return (
    <>
    
    <div className="top">
      <div className="left">
        <Avatar size={'sm'} src={userProfile?.profilePicURL} />
        <Text fontSize={12} fontWeight={'bold'}>
          {userProfile?.username}
        </Text>
        {authUser?.uid !== userProfile?.uid && (
          <>
            •
            <Button
              size={'xs'}
              bg={'transparent'}
              fontSize={14}
              color={'blue.500'}
              fontWeight={'bold'}
              _hover={{
                color: 'white',
              }}
              p={0}
              transition={'0.2s ease-in-out'}
              isLoading={loading}
              onClick={handleFollowUser}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          </>
        )}
      </div>
      {authUser?.uid === userProfile?.uid && (
        <div className="right">
          <Button
            size={'sm'}
            bg={'transparent'}
            _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
            borderRadius={4}
            p={1}
            isLoading={isDeleting}
            onClick={() => handleDeletePost(post)}
          >
            <MdDelete size={20} cursor="pointer" />
          </Button>
        </div>
      )}
      {/* <p>{post.caption}</p> */}
    </div>
    <div className="bottom">
        {post?.caption}
    </div>
    </>
  );
};

export default ProfilePostModalHeader;
