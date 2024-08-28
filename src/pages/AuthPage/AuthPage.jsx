import AuthBox from '../../components/AuthBox/AuthBox';
import Footer from '../../components/Footer/Footer';
import './AuthPage.scss';

const AuthPage = () => {
  return (
    <div className="container">
      <div className="auth-container">
        <div className="left-section">
          <img src="/img/auth.png" alt="instagram phone image" />
        </div>
        <div className="right-section">
          <AuthBox />
          <div className="get-app-container">
            <p>Get the app.</p>
            <div className="app-logo-container">
              <img
                src="/img/playstore.png"
                alt="playstore logo"
              />
              <img
                src="/img/microsoft.png"
                alt="microsoft logo"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
