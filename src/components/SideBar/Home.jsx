import { Tooltip } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Tooltip
      label="Home"
      hasArrow
      placement="right"
      openDelay={500}
      ml={1}
      display={{ base: 'block', md: 'none' }}
    >
      <NavLink className="nav-item-container" to="/">
        <div className="icon-container">
          <AiFillHome size={25} />
        </div>
        <div className="text-container">Home</div>
      </NavLink>
    </Tooltip>
  );
};

export default Home;
