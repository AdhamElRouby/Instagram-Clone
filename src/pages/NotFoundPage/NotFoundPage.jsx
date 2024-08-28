import InstagramLogoHeader from '../../components/InstagramLogoHeader/InstagramLogoHeader';
import Footer from '../../components/Footer/Footer';
import NotFoundText from '../../components/NotFoundText/NotFoundText';

const NotFoundPage = () => {
  return (
    <>
      <InstagramLogoHeader />
      <div className="container">
        <NotFoundText />
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;
