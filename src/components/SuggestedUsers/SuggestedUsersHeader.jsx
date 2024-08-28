import { Avatar, Text, Button } from '@chakra-ui/react';
import useLogout from '../../hooks/useLogout';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

const SuggestedUsersHeader = () => {
  const { handleLogout, loading } = useLogout();
  const { user } = useAuth();

  return (
    <div className="suggested-users-header-container">
      <NavLink className="profile-avatar-username-container" to={`${user?.username}`}>
        <Avatar boxSize={'35px'} src={user?.profilePicURL} />
        <Text fontSize={12} fontWeight={'bold'}>
          {user?.username}
        </Text>
      </NavLink>
      <Button
        size={'xs'}
        background={'transparent'}
        _hover={{ background: 'transparent' }}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
        isLoading={loading}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </div>
  );
};

export default SuggestedUsersHeader;
