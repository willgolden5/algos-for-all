import { Button, Flex, Heading, Text } from '@chakra-ui/react';

const HowItWorks = () => {
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
};

export default HowItWorks;
