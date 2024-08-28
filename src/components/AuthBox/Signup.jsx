import { useState, useEffect } from 'react';
import { Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import Password from '../Password/Password';
import useSignupWithEmailAndPassword from '../../hooks/useSignupWithEmailAndPassword';

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    fullname: '',
    username: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const { signup, myError:error, loading } = useSignupWithEmailAndPassword();

  useEffect(() => {
    if (
      inputs.email &&
      inputs.fullname &&
      inputs.username &&
      inputs.password.length >= 6
    )
      setIsDisabled(false);
    else setIsDisabled(true);
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Email"
        size="sm"
        type="email"
        name="email"
        my={3}
        value={inputs.email}
        onChange={handleChange}
      />
      <Input
        placeholder="Full Name"
        size="sm"
        type="text"
        name="fullname"
        value={inputs.fullname}
        onChange={handleChange}
      />
      <Input
        placeholder="Username"
        size="sm"
        type="text"
        name="username"
        my={3}
        value={inputs.username}
        onChange={handleChange}
      />

      <Password value={inputs.password} onChange={handleChange} />

      {!loading && error && (
        <Alert
          status="error"
          fontSize={13}
          p={2}
          borderRadius={4}
          my={3}
          maxW="300px"
          wordBreak="break-word"
        >
          <AlertIcon fontSize={12} />
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        colorScheme="blue"
        w="full"
        size="sm"
        my={!error ? 3 : 0}
        isDisabled={isDisabled}
        isLoading={loading}
      >
        Sign up
      </Button>
    </form>
  );
};

export default Signup;
