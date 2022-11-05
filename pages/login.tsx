import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import DefaultLayout from '../components/layout';

const Login = () => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <Input placeholder='me@email.com' variant='filled' mb={3} type='email' />
        <Input placeholder='******' variant='filled' mb={6} type='password' />
        <Button colorScheme='teal' type='submit'>
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
