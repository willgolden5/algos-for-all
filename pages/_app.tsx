import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import DefaultLayout from '../components/layout';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ChakraProvider>
  );
}
