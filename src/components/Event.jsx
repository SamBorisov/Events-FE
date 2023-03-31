import React from "react"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Event(props) {

    const [tokenUri, setTokenUri] = useState('');
    const [eName, seteName] = useState('');
    const [eDetails, seteDetails] = useState('');
    const [ePrice, setePrice] = useState('');

    useEffect(() => {
        async function fetchEvent() {
            if(typeof window.ethereum !== "undefuned") {
                const contract = new ethers.Contract(props.address, props.abi ,props.provider)

          const tokenUri = await contract.getUri(); 
          const eventName = await contract.getEventName(); 
          const eventDetails = await contract.getEventDetails(); 
          const eventPrice = await contract.getEventPrice(); 
          setTokenUri(tokenUri);
          seteName(eventName);
          seteDetails(eventDetails);
          setePrice(eventPrice.toNumber());
        }
    }
    fetchEvent();
      }, []);

return(
    <div>

    <h4>{eName}</h4>
    <img src={tokenUri} alt="Token Image" />
    <h4>{eDetails}</h4>
    <h4>Price for one ticket: {ePrice} Ether</h4>

    </div>

)
}