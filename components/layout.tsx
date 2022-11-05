import { Box, ChakraProvider } from '@chakra-ui/react';
import NavBar from '../components/navbar';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box height='100vh'>
      <Box h='5%'>
        <NavBar />
      </Box>
      <Box h='95%'>{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
