import { Button, Flex, Heading, Text } from '@chakra-ui/react';

//this page should show the trading algorithms that we have available to trade with

// TODO:
// 1. Create algorithms table in pscale with columns: id, name, description, price, sharpe, and image

const TradingAlgorithms = () => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Heading>Coming Soon...</Heading>
      <Text mb={6}>Sign up to be notified when we go live!</Text>
      <Flex direction='column' w='20%'>
        <Button as='a' colorScheme='teal' type='submit' href='/signup' w='100%'>
          Get Notified
        </Button>
      </Flex>
    </Flex>
  );
};

export default TradingAlgorithms;
