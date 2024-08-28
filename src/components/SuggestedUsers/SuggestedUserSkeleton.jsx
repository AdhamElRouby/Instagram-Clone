import { Skeleton, SkeletonCircle } from '@chakra-ui/react'

const SuggestedUserSkeleton = () => {
  return (
    <div className="suggested-user-skeleton">
        <SkeletonCircle size={'40px'} />
        <div className="right">
            <Skeleton height="12px" width="150px" />
            <Skeleton height="12px" width="100px" />
        </div>
    </div>
  )
}

export default SuggestedUserSkeleton