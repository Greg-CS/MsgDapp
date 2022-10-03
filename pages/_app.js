import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider } from '@chakra-ui/react'

import { createStandaloneToast } from '@chakra-ui/toast'
const { toast } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={"ukLSZy22h5QewKp6pQMECI9jkWL72ht6hpVtbcdE"} serverUrl={"https://a9coz7w46phh.usemoralis.com:2053/server"}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  )
}

export default MyApp

export const infoToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: 'info',
    duration: 3500,
    isClosable: true,
    position: 'top-left'
  })
}

export const errorToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: 'error',
    duration: 3500,
    isClosable: true,
    position: 'top-left'
  })
}

export const warningToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: 'warning',
    duration: 3500,
    isClosable: true,
    position: 'top-left'
  })
}


export const successToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: 'success',
    duration: 3500,
    isClosable: true,
    position: 'top-left'
  })
}
