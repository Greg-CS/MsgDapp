import Head from 'next/head'
import { useState, useMemo, useEffect } from 'react'
import { messageAddress } from '../constants/address'
import { ethers } from 'ethers'
import { messageAbi } from '../constants/abi'
import { useSigner } from '../hooks/useSigner'
import { useMoralis } from 'react-moralis'
import { Input, Container, Button, Center, Text, Heading } from '@chakra-ui/react'
import { errorToast, infoToast, successToast } from "./_app";

export default function Home() {
  
  const { signer } = useSigner();
  console.log(signer);
  const messageContractInstance = useMemo(() => new ethers.Contract(messageAddress, messageAbi, signer), [signer]);
  const [messageBlock, setMessageBlock] = useState('');
  const { authenticate, isAuthenticated, logout, user, account } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated');
    } else {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
      const message = await messageContractInstance.setMessage(messageBlock);
      successToast('Success', 'Message set successfully');
    } catch (error) {
      errorToast("Error", error.message);
    }
  }
  }

  const getMessage = async () => {
    if (!isAuthenticated) {
      infoToast("Please login to get message.");
      return;
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
    <div>
      <Head>
        <title>Message Dapp</title>
        <meta name="description" content="Simple Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <br/>
        <br/>
        <Container style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
          <h1>Message Dapp</h1>
          {!isAuthenticated ? 
          <Button onClick={login}>Login</Button>
          :
          <Button onClick={logOut}>Logout</Button>
          }
        </Container>
        <br/>
        <br/>
        <Text style={{textAlign: "center"}}>
          Logged in user: {account}
        </Text>
        <br/>
        <br/>
        <Container>
          <Input placeholder='Change Me!' onChange={handleInputChange}/>
          <br/>
          <br/>
          <Center>
            <Button onClick={setMessage}>Set new message</Button>
          </Center>
        </Container>
        <br/>
        <br/>
        <Container style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
          <Text>Changed Message: </Text>
          <Button onClick={getMessage}>{messageBlock}</Button>
        </Container>
        
      </main>
    </div>
  )
}
