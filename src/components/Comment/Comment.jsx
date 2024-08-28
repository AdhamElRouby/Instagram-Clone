import { Avatar, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import CommentSkeleton from './CommentSkeleton';
import timeAgo from '../../utils/timeAgo';
import './Comment.scss';

const Comment = ({ comment, onClose }) => {
  const { loading, userProfile } = useGetUserProfileById(comment.createdBy);

  if (loading) return <CommentSkeleton />;

  return (
    <div className="comment-item-container">
      <NavLink
        to={`/${userProfile?.username}`}
        className="left"
        onClick={onClose || undefined}
      >
        <Avatar size="sm" src={userProfile?.profilePicURL} cursor="pointer" />
      </NavLink>

      <div className="right">
        <p className="comment-top">
          <NavLink
            to={`/${userProfile?.username}`}
            onClick={onClose || undefined}
          >
            {userProfile?.username}
          </NavLink>{' '}
          {comment.comment}
        </p>
        <Text fontSize={12} color="gray" className="bottom">
          {timeAgo(comment.createdAt)}
        </Text>
      </div>
    </div>
  );
};

export default Comment;
