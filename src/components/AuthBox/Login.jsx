import { useState, useEffect } from 'react';
import Password from '../Password/Password';
import { Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import getFirebaseErrorMessage from '../../utils/getFirebaseErrorMessage';

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const { login, loading, error } = useLogin();

  useEffect(() => {
    if (inputs.email && inputs.password.length >= 6) setIsDisabled(false);
    else setIsDisabled(true);
  }, [inputs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs);
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
      <Password value={inputs.password} onChange={handleChange} />

      {!loading && error && (
        <Alert
          status="error"
          fontSize={13}
          p={2}
          borderRadius={4}
          my={3}
          maxW="250px"
          wordBreak="break-word"
        >
          <AlertIcon fontSize={12} />
          {getFirebaseErrorMessage(error.code)}
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
        Login
      </Button>
    </form>
  );
};

export default Login;
