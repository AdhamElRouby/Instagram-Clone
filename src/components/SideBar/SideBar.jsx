import { Button } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants';
import { NavLink } from 'react-router-dom';
import SideBarItems from './SideBarItems';
import useWindowSize from '../../hooks/useWindowSize';
import useLogout from '../../hooks/useLogout';
import './SideBar.scss';

const SideBar = () => {
  const { width } = useWindowSize();
  const { handleLogout, loading } = useLogout();

  return (
    <nav>
      <div className="instagram-logo-container">
        {width >= 768 ? <InstagramLogo /> : <InstagramMobileLogo />}
      </div>

      <SideBarItems />

      <div
        className="nav-item-container logout-container"
        onClick={handleLogout}
      >
        <div className="icon-container">
          <BiLogOut size={25} />
        </div>
        <NavLink to={'/auth'}>
          <Button
            display={{ base: 'none', md: 'block' }}
            variant={'ghost'}
            _hover={{ bg: 'transparent' }}
            p={0}
            isLoading={loading}
          >
            Logout
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideBar;
