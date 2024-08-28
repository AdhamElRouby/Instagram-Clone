import { useRef, useState } from 'react';
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from '../../assets/constants';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import usePostComment from '../../hooks/usePostComment';
import useLikePost from '../../hooks/useLikePost';
import timeAgo from '../../utils/timeAgo';
import useShowToast from '../../hooks/useShowToast';
import CommentsModal from '../Comment/CommentsModal';

const PostFooter = ({ post, userProfile, isProfilePic = false }) => {
  const [comment, setComment] = useState('');
  const { user: authUser } = useAuth();
  const { handleLikePost, isLiked } = useLikePost(post);
  const { loading, handlePostComment } = usePostComment();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentInputRef = useRef(null);
  const showToast = useShowToast();

  const handleCommentLogoClick = () => {
    if (!authUser)
      return showToast('Error', 'You must log in to post comments', 'error');
    commentInputRef.current.focus();
  };

  const handleClickPost = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, comment);
    setComment('');
  };

  return (
    <div className="post-footer-container">
      <div className="icons-container">
        <Box cursor="pointer" onClick={handleLikePost}>
          {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
        </Box>
        <Box cursor="pointer" onClick={handleCommentLogoClick}>
          <CommentLogo />
        </Box>
      </div>
      <div className="likes-container">{post.likes.length} likes</div>

      {isProfilePic && (
        <Text fontSize={12} color={'gray'}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePic && (
        <>
          <div className="good-container">
            <span>{userProfile?.username}</span> {post.caption}
          </div>
          {post.comments.length > 0 && (
            <div className="view-comments-container" onClick={onOpen}>
              View all {post.comments.length} comments
            </div>
          )}
          {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
        </>
      )}

      <form className="add-comment" onSubmit={handleClickPost}>
        <InputGroup>
          <Input
            variant="flushed"
            placeholder="Add a comment..."
            fontSize={14}
            ref={commentInputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <InputRightElement>
            <Button
              type="submit"
              color="blue.500"
              bg="transparent"
              cursor="pointer"
              fontWeight={600}
              fontSize={14}
              _hover={{ color: 'white' }}
              _active={{ bg: 'transparent' }}
              isLoading={loading}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </div>
  );
};

export default PostFooter;
