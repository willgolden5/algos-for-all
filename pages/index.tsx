'use client';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Heading>Coming Soon...</Heading>
      <Text mb={6}>Sign up below to be notified when we go live!</Text>
      <Flex direction='column' w='20%'>
        <Input placeholder='me@email.com' variant='filled' mb={3} type='email' />
        <Button colorScheme='teal' type='submit'>
          Notify Me
        </Button>
      </Flex>
    </Flex>
  );
}
