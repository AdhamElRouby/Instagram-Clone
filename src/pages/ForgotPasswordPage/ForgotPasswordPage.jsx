import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InstagramLogoHeader from '../../components/InstagramLogoHeader/InstagramLogoHeader';
import { IoLockClosedOutline } from 'react-icons/io5';
import { Input, Button } from '@chakra-ui/react';
import Footer from '../../components/Footer/Footer';
import useForgotPassword from '../../hooks/useForgotPassword';
import './ForgotPasswordPage.scss';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { handlePasswordReset, sending } = useForgotPassword();

  useEffect(() => {
    if (email) setIsDisabled(false);
    else setIsDisabled(true);
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePasswordReset(email);
  };

  return (
    <>
      <InstagramLogoHeader />
      <div className="container">
        <div className="forgot-pass-box">
          <div className="main-box">
            <div className="logo-container">
              <IoLockClosedOutline />
            </div>
            <p className="heavy-text">Trouble logging in?</p>
            <p className="light-text">
              Enter your email and {"we'll"} send you a link to reset your
              password.
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Email"
                size="md"
                type="email"
                name="email"
                my={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                colorScheme="blue"
                type="submit"
                w="full"
                size="sm"
                isDisabled={isDisabled}
                isLoading={sending}
              >
                Send reset email
              </Button>
            </form>
            <div className="or-container">
              <div className="line left"></div>
              <div className="or-text">OR</div>
              <div className="line right"></div>
            </div>
            <NavLink to="/auth" state={true}>
              Create new account
            </NavLink>
          </div>
          <NavLink to="/auth" state={null}>
            <Button
              colorScheme="gray"
              w="full"
              size="md"
              my={3}
              className="login-btn"
            >
              Back to login
            </Button>
          </NavLink>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPasswordPage;
