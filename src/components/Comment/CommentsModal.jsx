import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Comment from './Comment';
import usePostComment from '../../hooks/usePostComment';

const CommentsModal = ({ post, isOpen, onClose }) => {
  const [comment, setComment] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { loading, handlePostComment } = usePostComment();
  const commentContainerRef = useRef(null);

  useEffect(() => {
    if (comment) setIsDisabled(false);
    else setIsDisabled(true);
  }, [comment]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const { scrollHeight, clientHeight } = commentContainerRef.current;
        commentContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, comment);
    setComment('');
    setTimeout(() => {
      const { scrollHeight, clientHeight } = commentContainerRef.current;
      commentContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }, 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader border={'none'}>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={'column'}
            maxH={'250px'}
            overflowY={'auto'}
            ref={commentContainerRef}
          >
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} onClose={onClose} />
            ))}
          </Flex>
          <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
            <Input
              placeholder="Comment"
              size={'sm'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button
                type="submit"
                ml={'auto'}
                size={'sm'}
                my={4}
                isDisabled={isDisabled}
                isLoading={loading}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
