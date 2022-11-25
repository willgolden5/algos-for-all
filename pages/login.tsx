import { Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { buildAuthLink } from '../utils/alpacaAuthBuilder';

const Login = () => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const isDevelopment = process.env.NODE_ENV === 'development';

  const onSubmit = () => {
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(formState),
    });
    toast({
      title: 'Error',
      description: 'Account creation is currently disabled.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const alpacaAuth = () => {
    const redirectLink = isDevelopment ? 'http://localhost:3000/' : 'https://blackboxquant.com/';
    return buildAuthLink('6c41c11c0633aff59d424f450ea4969b', redirectLink);
  };

  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={8} rounded={6} w='25%'>
        <Heading mb={6}>Log in</Heading>
        <Text mb={6}>Use your Alpaca.markets account to start using blackbox algorithms</Text>
        {/* <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='me@email.com'
            variant='filled'
            mb={3}
            type='email'
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          />
          <FormLabel>Password</FormLabel>
          <Input
            placeholder='******'
            variant='filled'
            mb={6}
            type='password'
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          />
        </FormControl> */}
        <Button href={alpacaAuth()} as='a' colorScheme='teal' type='submit' w='100%' onClick={() => onSubmit()}>
          Login with Alpaca
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
