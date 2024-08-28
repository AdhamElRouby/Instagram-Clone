import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthBox.scss';

const AuthBox = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(state ? false : true);

  const handleForgotPassword = () => {
    navigate('/password/reset');
  };

  const hanldeChangeIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <div className="top-box">
        <div className="img-container">
          <img src="/img/logo.png" alt="instagram logo" />
        </div>
        {isLoggedIn ? <Login /> : <Signup />}
        <div className="or-container">
          <div className="line left"></div>
          <div className="or-text">OR</div>
          <div className="line right"></div>
        </div>
        <GoogleAuth />
        {isLoggedIn && (
          <div
            className="forgot-password dark-a"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </div>
        )}
      </div>

      <div className="bottom-box">
        <p>
          {isLoggedIn ? "Don't have an account?" : 'Have an account?'}{' '}
          <a className="light-a" onClick={hanldeChangeIsLoggedIn}>
            {isLoggedIn ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </div>
    </>
  );
};

export default AuthBox;
