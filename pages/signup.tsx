'use client';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const SignUp = () => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    email: '',
    lastName: '',
    firstName: '',
    phone: '',
  });

  const submitForm = async () => {
    const data = await fetch('/api/mailing-list-create', {
      method: 'POST',
      body: JSON.stringify(formState),
    });
    const res = await data.json();
    console.log(res);
    if (res.message === 'already exists') {
      toast({
        title: 'Error',
        description: 'There was an error adding you to the mailing list.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setFormState({
        email: '',
        lastName: '',
        firstName: '',
        phone: '',
      });
      toast({
        title: 'Success',
        description: 'You will be notified when we go live!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={10} rounded={6}>
        <Heading mb={6}>Interest list</Heading>
        <Text mb={6}>Sign up to be notified when we go live!</Text>
        <Flex direction='row' w='100%'>
          <FormControl pr={2} w='100%'>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder='John'
              variant='filled'
              mb={3}
              value={formState.firstName}
              onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
            />
          </FormControl>
          <FormControl pl={2} w='100%'>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder='Smith'
              variant='filled'
              mb={6}
              value={formState.lastName}
              onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
            />
          </FormControl>
        </Flex>
        <Flex direction='row' w='100%'>
          <FormControl pr={2}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder='jsmith@gmail.com'
              variant='filled'
              mb={6}
              type='email'
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
          </FormControl>
          <FormControl pl={2}>
            <FormLabel>Phone</FormLabel>
            <Input
              placeholder='(555)-555-5555'
              variant='filled'
              mb={6}
              type='phone'
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            />
          </FormControl>
        </Flex>
        <Button colorScheme={'yellow'} type='submit' onClick={() => submitForm()}>
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignUp;
