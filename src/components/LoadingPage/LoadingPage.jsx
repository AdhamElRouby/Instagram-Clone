import { InstagramMobileLogo } from '../../assets/constants';
import { Text } from '@chakra-ui/react';
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page-container">
      <div className="top">
        <InstagramMobileLogo />
      </div>
      <div className="bottom">
        <Text fontSize={12} color={'gray'}>from</Text>
        <img src="/img/meta-logo.png" alt="meta-white-logo" />
      </div>
    </div>
  )
}

export default LoadingPage