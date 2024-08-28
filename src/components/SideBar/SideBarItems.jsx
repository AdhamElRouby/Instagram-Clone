import Home from './Home';
import Search from './Search';
import Notifications from './Notifications';
import CreatePost from './CreatePost';
import ProfileLink from './ProfileLink';

const SideBarItems = () => {
  return (
    <div className="nav-icons-container">
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </div>
  );
};

export default SideBarItems;
