const useFirebaseErrorMessage = () => {
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email already exists.';
      case 'auth/invalid-email':
        return 'The email address is not valid.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Wrong email or password.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  };

  return { getErrorMessage };
};

export default useFirebaseErrorMessage;
