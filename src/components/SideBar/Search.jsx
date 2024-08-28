import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from '@chakra-ui/react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';
import { SearchLogo } from '../../assets/constants';
import { useDisclosure } from '@chakra-ui/react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, user, setUser, handleSearchUser } = useSearchUser();

  useEffect(() => {
    if(query) setIsDisabled(false);
    else setIsDisabled(true);
  }, [query])

  const handleOpen = () => {
    setQuery('');
    setUser(null);
    onOpen();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearchUser(query.toLowerCase());
  };

  return (
    <>
      <Tooltip
        label="Search"
        hasArrow
        placement="right"
        openDelay={500}
        ml={1}
        display={{ base: 'block', md: 'none' }}
      >
        <div className="nav-item-container" onClick={handleOpen}>
          <div className="icon-container">
            <SearchLogo />
          </div>
          <div className="text-container">Search</div>
        </div>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader border={'none'}>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </FormControl>

              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button
                  type="submit"
                  ml={'auto'}
                  size={'sm'}
                  my={4}
                  isLoading={loading}
                  isDisabled={isDisabled}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} onClose={onClose} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
