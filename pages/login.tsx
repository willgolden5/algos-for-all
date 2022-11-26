import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { buildAuthLink } from '../utils/alpacaAuthBuilder';
import { isDevelopment } from '../utils/utils';
import alpaca from '../public/image-51.png';
import Image from 'next/image';

const Login = () => {
  const toast = useToast();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    setTimeout(() => {
      toast({
        title: 'Get ready!',
        description: "You are being redirected to Alpaca's login page.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }, 2000);
    fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(formState),
    });
  };

  const alpacaAuth = () => {
    const redirectLink = isDevelopment ? 'http://localhost:3000/' : 'https://blackboxquant.com/';
    return buildAuthLink('6c41c11c0633aff59d424f450ea4969b', redirectLink);
  };

  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Flex direction='column' background='gray.200' p={8} rounded={6} w='25%' minW='320px'>
        <Heading mb={6}>Log in</Heading>
        <Text mb={6}>Use your Alpaca.markets account to start using blackbox algorithms</Text>
        <Button
          rightIcon={
            <Box w='78px' h=''>
              <Image src={alpaca} alt={'logo'} />
            </Box>
          }
          href={alpacaAuth()}
          as='a'
          variant={'outline'}
          colorScheme='black'
          type='submit'
          w='100%'
          onClick={() => onSubmit()}
        >
          Login with
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
