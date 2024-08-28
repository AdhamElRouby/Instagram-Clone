import { Avatar, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import useFollowUser from '../../hooks/useFollowUser';
import timeAgo from '../../utils/timeAgo';
import { useAuth } from '../../context/AuthContext';

const PostHeader = ({ createdAt, userProfile }) => {
  const { user: authUser } = useAuth();
  const { isFollowing, loading, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  return (
    <div className="post-header-container">
      <div className="left-container">
        <NavLink to={`/${userProfile?.username}`}>
          <Avatar size="sm" src={userProfile?.profilePicURL} cursor="pointer" />
        </NavLink>
        <NavLink to={`/${userProfile?.username}`}>
          <p className="profile-name">{userProfile?.username}</p>
        </NavLink>
        <p className="date">• {timeAgo(createdAt)}</p>
      </div>
      {authUser?.uid !== userProfile?.uid && (
        <div className="right-container">
          <Button
            size={'xs'}
            bg={'transparent'}
            fontSize={14}
            color={'blue.500'}
            fontWeight={'bold'}
            _hover={{
              color: 'white',
            }}
            transition={'0.2s ease-in-out'}
            isLoading={loading}
            onClick={handleFollowUser}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
