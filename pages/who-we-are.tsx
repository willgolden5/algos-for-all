import { Button, Flex, Heading, Text } from '@chakra-ui/react';

const WhoWeAre = () => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Heading mb={3}>Coming Soon...</Heading>
      <Text mb={6}>Sign up to be notified blackbox goes live!</Text>
      <Flex direction='column' w='20%'>
        <Button as='a' colorScheme={'yellow'} type='submit' href='/signup' w='100%'>
          Get Notified
        </Button>
      </Flex>
    </Flex>
  );
};

export default WhoWeAre;
