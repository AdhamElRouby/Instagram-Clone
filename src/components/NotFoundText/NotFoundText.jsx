import { NavLink } from 'react-router-dom';
import './NotFoundText.scss';

const NotFoundText = () => {
  return (
    <main className="not-found-container">
      <div className="heavy-text">Sorry, this page {"isn't"} available.</div>
      <p>
        The link you followed may be broken, or the page may have been removed.{' '}
        <NavLink to="/" replace={true} className="dark-a">
          Go back to Instagram.
        </NavLink>
      </p>
    </main>
  );
};

export default NotFoundText;
