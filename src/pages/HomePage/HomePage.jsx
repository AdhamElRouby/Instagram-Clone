import { useEffect, useRef } from 'react';
import FeedPostsContainer from '../../components/FeedPostsContainer/FeedPostsContainer';
import SuggestedUsersContainer from '../../components/SuggestedUsers/SuggestedUsersContainer';
import './HomePage.scss';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (Math.round(scrollTop) >= scrollHeight - clientHeight) {
        console.log('Reached the bottom of the page');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="feed-container">
        <FeedPostsContainer />
      </div>
      <div className="suggested-container">
        <SuggestedUsersContainer />
      </div>
    </div>
  );
};

export default HomePage;
