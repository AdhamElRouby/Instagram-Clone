import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="top-container">
        <a>Meta</a>
        <a>About</a>
        <a>Blog</a>
        <a>Jobs</a>
        <a>Help</a>
        <a>API</a>
        <a>Privacy</a>
        <a>Cookie Settings</a>
        <a>Terms</a>
        <a>Locations</a>
        <a>Instagram Lite</a>
        <a>Threads</a>
        <a>Contact Uploading & Non-Users</a>
        <a>Meta Verified</a>
      </div>
      <div className="bottom-container">
        <select name="language">
          <option value="english">English</option>
        </select>
        <p>
          &#169; {new Date().getFullYear()} Instagram by{' '}
          <a target="_blank" href="https://github.com/adhamelrouby">
            Adham El-Rouby
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
