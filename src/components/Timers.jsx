import React from "react"
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import Button from "./Button";
import { abi } from '../contracts/constants';


export default function Timers(props) {

    const [time,setTime] = useState("see time now");
    const [endTime,setEndTime] = useState(() => {
        const storedEndTime = localStorage.getItem('endTime');
        return storedEndTime === null ? "see end time" : storedEndTime 
       
      });
    


        //See time
        async function CheckTime() {
            if(typeof window.ethereum !== "undefined") {
              const contract = new ethers.Contract(props.address, abi ,props.provider)
              try {
                const time = await contract.getCurrentTimestamp();

                const bigNumber =  BigNumber.from(time);
                const timestampInSeconds = bigNumber.toNumber();

                const date = new Date(timestampInSeconds * 1000);
                const dateString = date.toLocaleString(); 
                setTime(dateString)

              } catch(err) {
                console.error('err: ',err)
              }
            }
          }    

          //See end time
        async function CheckEndTime() {
            if(typeof window.ethereum !== "undefined") {
              const contract = new ethers.Contract(props.address, abi ,props.provider)
              try {
                const time = await contract.getEndTimestamp();

                const bigNumber =  BigNumber.from(time);
                const timestampInSeconds = bigNumber.toNumber();

                const date = new Date(timestampInSeconds * 1000);
                const dateString = date.toLocaleString(); 
                setEndTime(dateString)
                localStorage.setItem('endTime', dateString);

              } catch(err) {
                console.error('err: ',err)
              }
            }
          }    
      

return(

    <div>

        <Button func={CheckTime} text={time} color="#B1B1B1"/>
        <Button func={CheckEndTime} text={endTime} color="#ffa07a"/>

    </div>


)
}