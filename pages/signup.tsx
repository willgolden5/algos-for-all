'use client';
import { Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { setCookie, hasCookie  } from 'cookies-next';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
    const isRunned = useRef(false);
    const cookieAccount = hasCookie('account')
    const toast = useToast();
    const [formState, setFormState] = useState({
    email: '',
    lastName: '',
    firstName: '',
    phone: '',
    accessToken: '',
  });
  const router = useRouter();





  useEffect(() => {
    if(isRunned.current) return;
    isRunned.current = true;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'account already exists' || cookieAccount) {
            // set cookie with account info
            setHasAccount(true);
            setCookie('account', JSON.stringify(data.account));
            router.push('/');
            toast({
              title: 'Signed in!',
              description: 'Signed in with alpaca.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } else {
            setHasAccount(false);
            setFormState({ ...formState, accessToken: data.access_token });
            sessionStorage.setItem('access_token', data.access_token);
            sessionStorage.setItem('token_type', data.token_type);
            sessionStorage.setItem('scope', data.scope);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const submitForm = async () => {
    console.log({ ...formState });
    const data = await fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify({ ...formState }),
    });
    const res = await data;
    console.log(res);
    if (res.ok) {
      toast({
        title: 'Account created.',
        description: "We've created your account.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (res.status === 309) {
      // set cookie with account info
      setCookie('account', res.body);
      toast({
        title: 'Signed in!',
        description: 'Signed in with alpaca.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Account creation failed.',
        description: 'Please try again or contact us if the problem persists.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if(hasAccount === null) {
    return(
        <Flex align='center' justify='center' h='100%'>
            <Spinner
                speed='0.65s'
                emptyColor='gray.300'
                color='yellow.400'
                size='xl'
            />
        </Flex>);
  } else {
    return (
        <Flex h='100%' alignItems='center' justifyContent='center'>
            <Flex direction='column' background='gray.200' p={10} rounded={6}>
                <Heading mb={6}>Not done yet!</Heading>
                <Text mb={6}>Complete your account setup below:</Text>
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
  }
};

export default SignUp;
