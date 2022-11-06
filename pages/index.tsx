'use client';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Heading>Coming Soon...</Heading>
      <Text mb={6}>Sign up to be notified when we go live!</Text>
      <Flex direction='column' w='20%'>
        <Button as='a' colorScheme='teal' type='submit' href='/signup'>
          Get Notified
        </Button>
      </Flex>
    </Flex>
  );
}
