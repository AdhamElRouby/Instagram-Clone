import { useEffect, useState } from 'react';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

const Password = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (value) setIsButtonVisible(true);
    else setIsButtonVisible(false);
  }, [value]);

  return (
    <InputGroup size="sm">
      <Input
        placeholder="Password"
        pr="3rem"
        name="password"
        value={value}
        onChange={onChange}
        type={show ? 'text' : 'password'}
      />
      {isButtonVisible && (
        <InputRightElement width="3rem">
          <Button
            h="1.75rem"
            size="xs"
            onClick={handleClick}
            bg="transparent"
            _hover={{ bg: 'transparent', color: 'gray' }}
            _active={{ bg: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Password;
