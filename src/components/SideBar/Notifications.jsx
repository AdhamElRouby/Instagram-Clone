import { Tooltip } from '@chakra-ui/react';
import { NotificationsLogo } from '../../assets/constants';

const Notifications = () => {
  return (
    <Tooltip
      label="Notifications"
      hasArrow
      placement="right"
      openDelay={500}
      ml={1}
      display={{ base: 'block', md: 'none' }}
    >
      <div className="nav-item-container">
        <div className="icon-container">
          <NotificationsLogo />
        </div>
        <div className="text-container">Notifications</div>
      </div>
    </Tooltip>
  );
};

export default Notifications;
