import PageLayout from './components/PageLayout/PageLayout';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route path="/password/reset" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/auth"
        element={!user ? <AuthPage /> : <Navigate to="/" replace={true} />}
      />
      <Route element={<PageLayout />}>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" replace={true} />}
        />
        <Route path="/:username" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
