import EditProfile from './EditProfile';
import { AvatarGroup, Avatar, Text, Button } from '@chakra-ui/react';
import { useUserProfile } from '../../context/UserProfileContext';
import { useAuth } from '../../context/AuthContext';
import { useDisclosure } from '@chakra-ui/react';
import useFollowUser from '../../hooks/useFollowUser';

const ProfileHeader = () => {
  const { userProfile } = useUserProfile();
  const { user: authUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, loading, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile?.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile?.username;


  return (
    <div className="profile-header-container">
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} alignSelf={'center'}>
        <Avatar
          src={userProfile?.profilePicURL}
          borderColor={'whiteAlpah.300'}
        />
      </AvatarGroup>
      <div className="info">
        <div className="top">
          <Text fontSize={{ base: 'sm', md: 'lg' }}>
            {userProfile?.username}
          </Text>
          {visitingOwnProfileAndAuth && (
            <Button
              bg={'white'}
              color={'black'}
              _hover={{ bg: 'whiteAlpha.800' }}
              size={{ base: 'xs', md: 'sm' }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          )}
          {visitingAnotherProfileAndAuth && (
            <Button
              bg={'blue.500'}
              color={'white'}
              _hover={{ bg: 'blue.600' }}
              size={{ base: 'xs', md: 'sm' }}
              isLoading={loading}
              onClick={handleFollowUser}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
        <div className="stat">
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight={'bold'} mr={1}>
              {userProfile?.posts?.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight={'bold'} mr={1}>
              {userProfile?.followers?.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as="span" fontWeight={'bold'} mr={1}>
              {userProfile?.following?.length}
            </Text>
            Following
          </Text>
        </div>
        <Text fontSize={'sm'} fontWeight={'bold'}>
          {userProfile?.fullname}
        </Text>
        <Text fontSize={'sm'}>{userProfile?.bio}</Text>
      </div>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileHeader;
