import { Text } from '@chakra-ui/react';
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs';

const ProfileTabs = () => {
  return (
    <div className="profile-tabs-container">
      <div className="tab active">
        <BsGrid3X3 />
        <Text as={'span'} fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Posts
        </Text>
      </div>
      <div className="tab">
        <BsBookmark />
        <Text as={'span'} fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Saved
        </Text>
      </div>
      <div className="tab">
        <BsSuitHeart />
        <Text as={'span'} fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Likes
        </Text>
      </div>
    </div>
  );
};

export default ProfileTabs;
