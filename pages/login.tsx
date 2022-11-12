import { Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const Login = () => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    //testing start top of algo
    fetch('/api/login', {
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

  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={10} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <FormControl>
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
        </FormControl>
        <Button colorScheme='teal' type='submit' w='100%' onClick={() => onSubmit()}>
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
