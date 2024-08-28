import LoadingPage from '../LoadingPage/LoadingPage';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import { useLocation, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import './PageLayout.scss';

const PageLayout = () => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSideBar = user;
  const canRenderNavBar = pathname !== '/' && !loading && !user;

  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <LoadingPage />;

  return (
    <div
      className="global-container"
      style={{ flexDirection: canRenderNavBar ? 'column' : 'row' }}
    >
      {canRenderSideBar && <SideBar />}
      {canRenderNavBar && <NavBar />}
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
