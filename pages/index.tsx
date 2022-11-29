'use client';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import cube from '../public/cube.png';

export default function Home() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          // TODO: Create blackbox account: use access_token to request account data from alpaca
          // /api/user/create
          fetch('/api/user/create', {
            method: 'POST',
            body: JSON.stringify({ data }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));

          sessionStorage.setItem('access_token', data.access_token);
          sessionStorage.setItem('token_type', data.token_type);
          sessionStorage.setItem('scope', data.scope);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Image width={96} height={96} alt={'logo'} src={cube} />
      <Heading mb={3}>Coming Soon...</Heading>
      <Text mb={6}>Sign up to be notified when blackbox goes live.</Text>
      <Flex direction='column' w='20%'>
        <Button as='a' colorScheme={'yellow'} type='submit' href='/signup' w='100%'>
          Get Notified
        </Button>
      </Flex>
    </Flex>
  );
}
