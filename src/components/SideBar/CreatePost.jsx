import { useState, useRef, useEffect } from 'react';
import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import usePreviewImage from '../../hooks/usePreviewImage';
import useCreatePost from '../../hooks/useCreatePost';
import useShowToast from '../../hooks/useShowToast';
import { CreatePostLogo } from '../../assets/constants';
import { BsFillImageFill } from 'react-icons/bs';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedFile, setSelectedFile, handleImageUpload } =
    usePreviewImage();
  const { handleCreatePost, loading } = useCreatePost();
  const inputFileRef = useRef(null);
  const showToast = useShowToast();

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreviewURL(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  const handleOpen = () => {
    setCaption('');
    setPreviewURL('');
    setSelectedFile(null);
    if (inputFileRef.current !== null) inputFileRef.current.value = '';
    onOpen();
  };

  const handlePostClick = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
    } catch (err) {
      showToast('Error', err.message, 'error');
    }
  };

  return (
    <>
      <Tooltip
        label="Create Post"
        hasArrow
        placement="right"
        openDelay={500}
        ml={1}
        display={{ base: 'block', md: 'none' }}
      >
        <div className="nav-item-container" onClick={handleOpen}>
          <div className="icon-container">
            <CreatePostLogo />
          </div>
          <div className="text-container">Create</div>
        </div>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={'black'} border={'1px solid gray'}>
          <ModalHeader border={'none'}>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputFileRef}
              onChange={handleImageUpload}
            />
            <BsFillImageFill
              style={{
                marginTop: '15px',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
              size={16}
              onClick={() => inputFileRef.current.click()}
            />
            {previewURL && (
              <div className="create-post-img-container">
                <img src={previewURL} alt="selceted image" />
                <CloseButton
                  position={'absolute'}
                  top={2}
                  right={2}
                  onClick={() => {
                    setPreviewURL('');
                    setSelectedFile(null);
                    inputFileRef.current.value = '';
                  }}
                />
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} isLoading={loading} onClick={handlePostClick}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
