import useFollowUser from '../../hooks/useFollowUser';
import { NavLink } from 'react-router-dom';
import { Avatar, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

const SuggestedUser = ({ user, onClose, setUser }) => {
  const { isFollowing, loading, handleFollowUser } = useFollowUser(user?.uid);
  const { user: authUser } = useAuth();
  const sameUser = authUser && authUser.username === user.username;

  const onFollowClick = async () => {
    try {
      await handleFollowUser();
    } catch(err) {
      console.log(err);
    }
    setUser({
      ...user,
      followers: !isFollowing
        ? [...user.followers, authUser.uid]
        : user.followers.filter((uid) => uid !== authUser.uid),
    });
  };

  return (
    <div className="suggested-user-container">
      <div className="left">
        <NavLink to={`/${user.username}`} onClick={onClose}>
          <Avatar size="md" src={user.profilePicURL} cursor={'pointer'} />
        </NavLink>
        <div className="right">
          <NavLink to={`/${user.username}`} onClick={onClose}>
            <Text fontSize={12} fontWeight={'bold'} cursor={'pointer'}>
              {user.username}
            </Text>
          </NavLink>
          <Text fontSize={11} color={'gray'}>
            {user.followers?.length} followers
          </Text>
        </div>
      </div>
      {!sameUser && (
        <div className="right">
          <Button
            fontSize={13}
            bg={'transparent'}
            p={0}
            h={'max-content'}
            fontWeight={'medium'}
            color={'blue.400'}
            cursor={'pointer'}
            _hover={{ color: 'white' }}
            _active={{ bg: 'transparent' }}
            isLoading={loading}
            onClick={onFollowClick}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuggestedUser;
