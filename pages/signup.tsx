'use client';
import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: '',
    lastName: '',
    firstName: '',
  });

  const submitForm = () => {
    console.log(formState);
  };
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={10} rounded={6}>
        <Heading mb={6}>Create Account</Heading>
        <Flex direction='row' w='100%'>
          <FormControl pr={2} w='100%'>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder='John'
              variant='filled'
              mb={3}
              onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
            />
          </FormControl>
          <FormControl pl={2} w='100%'>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder='Smith'
              variant='filled'
              mb={6}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='jsmith@gmail.com'
            variant='filled'
            mb={6}
            type='email'
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          />
        </FormControl>
        <Button colorScheme='teal' type='submit' onClick={() => submitForm()}>
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignUp;
