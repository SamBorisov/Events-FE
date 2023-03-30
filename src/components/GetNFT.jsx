import React from "react"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function TokenImage(props) {

    const [tokenUri, setTokenUri] = useState('');

    useEffect(() => {
        async function fetchTokenUri() {
            if(typeof window.ethereum !== "undefuned") {
                const contract = new ethers.Contract(props.address, props.abi ,props.provider)

          const tokenUri = await contract.getUri(); // Replace 1 with your token ID
          setTokenUri(tokenUri);
        }
    }
        fetchTokenUri();
      }, []);

return(

    <img src={tokenUri} alt="Token Image" />

)
}