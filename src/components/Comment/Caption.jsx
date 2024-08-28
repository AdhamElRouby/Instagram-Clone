import { NavLink } from 'react-router-dom';
import { Avatar, Text } from '@chakra-ui/react';
import { useUserProfile } from '../../context/UserProfileContext';
import timeAgo from '../../utils/timeAgo';
import './Comment.scss';

const Caption = ({ post, onClose }) => {
  const { userProfile } = useUserProfile();

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
          {post.caption}
        </p>
        <Text fontSize={12} color="gray" className="bottom">
          {timeAgo(post.createdAt)}
        </Text>
      </div>
    </div>
  );
};

export default Caption;
