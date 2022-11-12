import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';

//this page should show the trading algorithms that we have available to trade with

// TODO:

const TradingAlgorithms = () => {
  const [ticker, setTicker] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    if (ticker && apiKey && apiSecret) {
      const res = await fetch('/api/start-algo', {
        method: 'POST',
        body: JSON.stringify({ ticker, apiKey, apiSecret, algo: 'mean-reversion' }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: 'Error',
          description: data.error,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Algorithm started',
          description: 'Your algorithm has been started',
          status: 'success',
          duration: 3000,
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please fill out all fields',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Flex h='100%' alignItems='center' justifyContent='center' direction='column'>
      <Flex direction='column' background='gray.200' p={10} rounded={6}>
        <Heading mb={6}>In the mean time...</Heading>
        <Text mb={6}>Try out a twenty minute mean reversion algorithm:</Text>
        <FormControl>
          <FormLabel>Alpaca API Key (paper only)</FormLabel>
          <Input
            placeholder='Alpaca paper api key'
            variant='filled'
            mb={3}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <FormLabel>Alpaca API Secret (paper only)</FormLabel>
          <Input
            placeholder='Alpaca paper api secret'
            variant='filled'
            mb={3}
            onChange={(e) => setApiSecret(e.target.value)}
          />
          <FormLabel>Ticker</FormLabel>
          <Input placeholder='AAPL' variant='filled' mb={3} onChange={(e) => setTicker(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme='teal' onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default TradingAlgorithms;
