import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={10} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder='me@email.com' variant='filled' mb={3} type='email' />
          <FormLabel>Password</FormLabel>
          <Input placeholder='******' variant='filled' mb={6} type='password' />
        </FormControl>
        <Button colorScheme='teal' type='submit' w='100%'>
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
