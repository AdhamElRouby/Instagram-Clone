import Comment from '../Comment/Comment';
import PostFooter from '../FeedPostsContainer/PostFooter';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import ProfilePostModalHeader from './ProfilePostModalHeader';

const ProfilePostModal = ({ post, isOpen, onClose }) => {
  const commentContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const { scrollHeight, clientHeight } = commentContainerRef.current;
        commentContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isOpen, post.comments?.length]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: '3xl', md: '5xl' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={'black'} pb={5}>
          <Flex
            gap="4"
            w={{ base: '90%', sm: '70%', md: 'full' }}
            mx={'auto'}
            maxH={'90vh'}
            minH={'50vh'}
            className="modal-body"
          >
            <div className="img-container">
              <img src={post.imgURL} alt="profile post" />
            </div>

            <div className="content-container">
              <ProfilePostModalHeader post={post} />
              <Divider mt={2} mb={4} bg={'gray.500'} />

              <div className="comments-container" ref={commentContainerRef}>
                {post.comments?.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onClose={onClose}
                  />
                ))}
              </div>

              <PostFooter post={post} isProfilePic={true} />
            </div>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePostModal;
