import React from "react"
import { useState, useEffect } from 'react';
import { abi } from '../contracts/constants';
import { ethers, BigNumber } from 'ethers';


export default function Event(props) {

    const [tokenUri, setTokenUri] = useState('');
    const [eName, seteName] = useState('');
    const [eDetails, seteDetails] = useState('');
    const [ePrice, setePrice] = useState('');
    const [endTime,setEndTime] = useState(() => {
        const storedEndTime = localStorage.getItem('endTime');
        return storedEndTime === null ? "see end time" : storedEndTime 
       
      });

    useEffect(() => {
        async function fetchEvent() {
            if(typeof window.ethereum !== "undefuned") {
                const contract = new ethers.Contract(props.address, abi ,props.provider)

          const tokenUri = await contract.getUri(); 
          const eventName = await contract.getEventName(); 
          const eventDetails = await contract.getEventDetails(); 
          const eventPrice = await contract.getEventPrice(); 
          setTokenUri(tokenUri);
          seteName(eventName);
          seteDetails(eventDetails);
          setePrice(eventPrice.toNumber());

          const time = await contract.getEndTimestamp();

            const bigNumber =  BigNumber.from(time);
            const timestampInSeconds = bigNumber.toNumber();

            const date = new Date(timestampInSeconds * 1000);
            const dateString = date.toLocaleString(); 
            setEndTime(dateString)
            localStorage.setItem('endTime', dateString);
        }
    }
    fetchEvent();
      }, []);

return(
    <div className="event">

    <h4> {eName}</h4>
    <img src={tokenUri} alt="Token Image" />
    <h4> {eDetails}</h4>
    <h4>Price: {ePrice} Ether</h4>
    <h4>Sale end time : {endTime}</h4>


    </div>

)
}