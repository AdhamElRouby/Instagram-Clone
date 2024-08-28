import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileHeaderSkeleton from '../../components/Profile/ProfileHeaderSkeleton';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import ProfilePostsContainer from '../../components/Profile/ProfilePostsContainer';
import useGetUserProfileByUsername from '../../hooks/useGetUserProfilebyUsername';
import NotFoundText from '../../components/NotFoundText/NotFoundText';
import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import './ProfilePage.scss';

const ProfilePage = () => {
  const { username } = useParams();
  const { userProfile, loading } = useGetUserProfileByUsername(username);

  const userNotFound = !loading && !userProfile;
  if (userNotFound) return <NotFoundText />;

  return (
    <Container
      maxWidth={'container.lg'}
      py={5}
      className="profile-page-container"
    >
      {loading && <ProfileHeaderSkeleton />} 
      {!loading && userProfile && <ProfileHeader />}
      <div className="bottom">
        <ProfileTabs />
        <ProfilePostsContainer />
      </div>
    </Container>
  );
};

export default ProfilePage;
