'use client';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';
import cube from '../public/cube.png';

export default function Home() {
  //get alpaca auth code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    sessionStorage.setItem('alpacaAuthCode', code as string);
  }, []);
  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Image width={96} height={96} alt={'logo'} src={cube} />
      <Heading>Coming Soon...</Heading>
      <Text mb={6}>Sign up to be notified when we go live!</Text>
      <Flex direction='column' w='20%'>
        <Button as='a' colorScheme='teal' type='submit' href='/signup' w='100%'>
          Get Notified
        </Button>
      </Flex>
    </Flex>
  );
}
