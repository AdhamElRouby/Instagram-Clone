import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProfileProvider } from './context/UserProfileContext.jsx';
import { PostsProvider } from './context/PostsContext.jsx';
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import App from './App.jsx';
import './index.scss';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('whiteAlpha.900', '#000')(props),
      color: mode('#000', 'whiteAlpha.900')(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProfileProvider>
          <PostsProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </PostsProvider>
        </UserProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
