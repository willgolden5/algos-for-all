import { Button, Flex, FormControl, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react';
import DefaultLayout from '../components/layout';

const SignUp = () => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={12} rounded={6}>
        <Heading mb={6}>Create Account</Heading>
        <Flex direction='row' w='100%'>
          <FormControl pr={2} w='100%'>
            <FormLabel>First Name</FormLabel>
            <Input placeholder='fist' variant='filled' mb={3} type='email' />
          </FormControl>
          <FormControl pl={2} w='100%'>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder='last' variant='filled' mb={6} type='password' />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder='me@gmail.com' variant='filled' mb={6} type='password' />
        </FormControl>
        <Button colorScheme='teal' type='submit'>
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignUp;
