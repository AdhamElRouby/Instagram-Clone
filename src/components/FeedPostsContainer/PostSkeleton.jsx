import { Skeleton, SkeletonCircle } from '@chakra-ui/react';

const PostSkeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="top">
        <SkeletonCircle size="10" />
        <div className="right">
          <Skeleton height="10px" w={'200px'} />
          <Skeleton height="10px" w={'200px'} />
        </div>
      </div>
      <div className="bottom">
        <Skeleton w={'full'} height="500px" />
      </div>
    </div>
  );
};

export default PostSkeleton;
