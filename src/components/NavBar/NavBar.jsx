import { Button } from '@chakra-ui/react';
import { InstagramLogo } from '../../assets/constants';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <div className="navbar-global">
      <div className="navbar-content">
        <InstagramLogo />
        <div className="left">
          <NavLink to="/auth" state={null}>
            <Button colorScheme={'blue'} size={'sm'}>
              Login
            </Button>
          </NavLink>
          <NavLink to="/auth" state={true}>
            <Button
              variant={'ghost'}
              colorScheme={'blue'}
              _hover={{ color: 'blue.400' }}
              size={'sm'}
            >
              Sign Up
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
