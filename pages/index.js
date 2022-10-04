import Head from 'next/head'
import { useState, useMemo, useEffect } from 'react'
import { messageAddress } from '../constants/address'
import { ethers } from 'ethers'
import { messageAbi } from '../constants/abi'
import { useSigner } from '../hooks/useSigner'
import { useMoralis, useChain } from 'react-moralis'
import { Input, Container, Button, Center, Text } from '@chakra-ui/react'
import { errorToast, infoToast, successToast } from "./_app";

export default function Home() {
  
  const { signer } = useSigner();
  const { switchNetwork } = useChain();
  const messageContractInstance = useMemo(() => new ethers.Contract(messageAddress, messageAbi, signer), [signer]);
  const [messageBlock, setMessageBlock] = useState('');
  const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();

  useEffect(() => {
    login();
  }, []);

    const handleSwitchChain = async () => {
      if(chainId !== '0x3'){
        await switchNetwork('0x3');
      }
    }
  
    useEffect(() => {
      if(chainId !== '0x3' && account) handleSwitchChain();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId, account])

  const login = async () => {
    authenticate({ signingMessage: "Sign message to login." });
  }

  const logOut = async () => {
    await logout();
  }
  const setMessage = async () => {
    if (!isAuthenticated) {
      infoToast("Please login to set message.");
      return;
    } else if (messageBlock === '') {
      infoToast("Please enter a message.");
      return;
    } 
    else {
    try {
      const message = await messageContractInstance.setMessage(messageBlock, account, );
      const tx = await message.wait();
      if (tx.status === 1) {
        successToast('Success', 'Message set successfully');
      }
    } catch (error) {
      errorToast("Error", error.message);
    }
  }
  }

  const getMessage = async () => {
    if (!isAuthenticated) {
      infoToast("Please login to get message.");
    } else {
    try {
      const message = await messageContractInstance.getMessage();
      setMessageBlock(message);
      console.log(message);
      successToast('Success', 'Message retrieved successfully');
    } catch (error) {
      errorToast("Error", error.message);
    }
  }
  }

  const handleInputChange = (e) => {
    setMessageBlock(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Message Dapp</title>
        <meta name="description" content="Simple Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container style={{display: "grid", gap: "10px"}} mt={12}>

        <Container style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
          <Text>Message Dapp</Text>
          {!isAuthenticated ? 
          <Button onClick={login}>Login</Button>
          :
          <Button onClick={logOut}>Logout</Button>
          }
        </Container>

        {isAuthenticated ?
          <Container  style={{display: "grid", gap: "30px"}}>
            <Text style={{textAlign: "center"}}>Logged in user: {account}</Text>
            <Container style={{display: "grid", gap: "30px"}}>
            <Input placeholder='Write a message!' onChange={handleInputChange}/>
            <Center>
              <Button onClick={setMessage}>Set new message</Button>
            </Center>
            </Container>

            <Container style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
              <Text>Hidden Message: </Text>
              <Button onClick={getMessage}>Click me</Button>
            </Container>
          </Container>
          :
          <Text style={{textAlign: "center"}}>Please login to use the Dapp</Text>
        }
        
      </Container>
    </>
  )
}
