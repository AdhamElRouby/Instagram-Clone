import { Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ProfileHeaderSkeleton = () => {
  return (
    <div className="profile-header-skeleton-container">
      <SkeletonCircle size="24" />
      <div className="left">
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
