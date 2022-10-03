import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider } from '@chakra-ui/react'

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
