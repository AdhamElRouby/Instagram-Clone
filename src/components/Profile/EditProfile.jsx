import { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import useShowToast from '../../hooks/useShowToast';
import usePreviewImage from '../../hooks/usePreviewImage';
import useEditProfile from '../../hooks/useEditProfile';

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({ fullname: '', username: '', bio: '' });
  const [previewURL, setPreviewURL] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useAuth();
  const { selectedFile, setSelectedFile, handleImageUpload } =
    usePreviewImage();
  const { editProfile, uploading } = useEditProfile();
  const showToast = useShowToast();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  useEffect(() => {
    setInputs({
      fullname: user.fullname,
      username: user.username,
      bio: user.bio,
    });
  }, [user]);

  useEffect(() => {
    if (
      inputs.fullname &&
      inputs.username &&
      (inputs.fullname !== user.fullname ||
        inputs.username !== user.username ||
        inputs.bio !== user.bio)
    )
      setIsDisabled(false);
    else if(!selectedFile) setIsDisabled(true);
  }, [inputs, user, selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreviewURL(objectURL);
      setIsDisabled(false);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [selectedFile]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={'black'}
          boxShadow={'xl'}
          border={'1px solid gray'}
          mx={3}
        >
          <ModalHeader border="none" />
          <ModalCloseButton />
          <ModalBody border={'none'}>
            <Flex>
              <Stack spacing={4} w={'full'} maxW={'md'} p={6}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={previewURL || user.profilePicURL}
                        border={'2px solid white '}
                      />
                    </Center>
                    <Center w="full">
                      <Button
                        w="full"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Edit Profile Picture
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                    </Center>
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Full Name</FormLabel>
                  <Input
                    placeholder={'Full Name'}
                    size={'sm'}
                    type={'text'}
                    name="fullname"
                    value={inputs.fullname}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Username</FormLabel>
                  <Input
                    placeholder={'Username'}
                    size={'sm'}
                    type={'text'}
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={'sm'}>Bio</FormLabel>
                  <Input
                    placeholder={'Bio'}
                    size={'sm'}
                    type={'text'}
                    name="bio"
                    value={inputs.bio}
                    onChange={handleChange}
                  />
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    size="sm"
                    _hover={{ bg: 'red.500' }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    size="sm"
                    w="full"
                    _hover={{ bg: 'blue.500' }}
                    isDisabled={isDisabled}
                    isLoading={uploading}
                    onClick={handleEditProfile}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
