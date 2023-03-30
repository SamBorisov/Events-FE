import React from "react"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Button from "./Button";


export default function LuckyWinner(props) {

    const [luckyWinner, setLuckyWinner] = useState("");


        //Get Lucky Winner
        async function GetWinner() {
            if(typeof window.ethereum !== "undefuned") {
              const contract = new ethers.Contract(props.address, props.abi ,props.provider.getSigner())
              try {
                const winner = await contract.chooseLuckyWinner({ gasLimit: 200000});
                setLuckyWinner(winner.toString())
                
              } catch(err) {
                console.error('err: ',err)
              }
            }
          }
              //See Lucky Winner
        async function SeeWinner() {
            if(typeof window.ethereum !== "undefuned") {
              const contract = new ethers.Contract(props.address, props.abi ,props.provider)
              try {
                const winner = await contract.getLuckyWinnerAddress();
                setLuckyWinner(winner.toString())

              } catch(err) {
                console.error('err: ',err)
              }
            }
          }
      

return(

    <div>

        <Button func={GetWinner} text="Get Lucky Winner"  color="#B1B1B1"/>
        <Button func={SeeWinner} text="See Lucky Winner" color="#B1B1B1"/>
        {luckyWinner ? (
        <h4>{luckyWinner}</h4>
        ) : null}


    </div>


)
}