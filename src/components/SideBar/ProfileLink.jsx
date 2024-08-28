import { Avatar, Tooltip } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileLink = () => {
  const { user } = useAuth();

  return (
    <Tooltip
      label="Profile"
      hasArrow
      placement="right"
      openDelay={500}
      ml={1}
      display={{ base: 'block', md: 'none' }}
    >
      <NavLink className="nav-item-container" to={`/${user?.username}`}>
        <div className="icon-container">
          <Avatar size="xs" src={user?.profilePicURL} />
        </div>
        <div className="text-container">Profile</div>
      </NavLink>
    </Tooltip>
  );
};

export default ProfileLink;
