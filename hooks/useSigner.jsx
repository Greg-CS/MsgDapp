import { useState, useEffect } from "react";
import { useMoralis } from 'react-moralis';

export const useSigner = () => {
  const { account, web3 } = useMoralis();
  const [signer, setSigner] = useState(null);

  const handleSetSigner = () =>{
    const currentSigner = web3.getSigner(account);
    setSigner(currentSigner);
  }

  useEffect(() => {
    if(signer === null && account !== null && web3 !== null) handleSetSigner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, account, web3]);

  return { signer };
}