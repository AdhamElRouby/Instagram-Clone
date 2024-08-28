import useGoogleAuthSignIn from '../../hooks/useGoogleAuthSignIn';

const GoogleAuth = () => {
  const { handleGoogleSignIn } = useGoogleAuthSignIn();

  return (
    <div className="google-login" onClick={handleGoogleSignIn}>
      <img src="/img/google.png" alt="google logo" />
      <a className="light-a">Log in with Google</a>
    </div>
  );
};

export default GoogleAuth;
