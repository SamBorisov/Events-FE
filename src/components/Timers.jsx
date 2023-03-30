import React from "react"
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import Button from "./Button";


export default function Timers(props) {

    const [time,setTime] = useState("see time now");
    const [endTime,setEndTime] = useState("see when sale ends");




        //See time
        async function CheckTime() {
            if(typeof window.ethereum !== "undefuned") {
              const contract = new ethers.Contract(props.address, props.abi ,props.provider)
              try {
                const time = await contract.getCurrentTimestamp();

                const bigNumber =  BigNumber.from(time);
                const timestampInSeconds = bigNumber.toNumber();

                const date = new Date(timestampInSeconds * 1000);
                const dateString = date.toLocaleString(); // '2022-12-12 09:45:39'
                setTime(dateString)

              } catch(err) {
                console.error('err: ',err)
              }
            }
          }    

          //See end time
        async function CheckEndTime() {
            if(typeof window.ethereum !== "undefuned") {
              const contract = new ethers.Contract(props.address, props.abi ,props.provider)
              try {
                const time = await contract.getEndTimestamp();

                const bigNumber =  BigNumber.from(time);
                const timestampInSeconds = bigNumber.toNumber();

                const date = new Date(timestampInSeconds * 1000);
                const dateString = date.toLocaleString(); // '2022-12-12 09:45:39'
                setEndTime(dateString)

              } catch(err) {
                console.error('err: ',err)
              }
            }
          }    
      

return(

    <div>

        <Button func={CheckTime} text={time} color="#B1B1B1"/>
        <Button func={CheckEndTime} text={endTime} color="#B1B1B1"/>

    </div>


)
}