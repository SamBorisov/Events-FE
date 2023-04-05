import React from "react"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Button from "./Button";
import { abi } from '../contracts/constants';


export default function LuckyWinner(props) {

    const [luckyWinner, setLuckyWinner] = useState(() => {
      const storedWinner = localStorage.getItem('winner');
      return storedWinner === null ? "" : storedWinner 
    });
    

    const [hasLuckyWinner, setHasLuckyWinner] = useState(false);


    useEffect(() => {
        async function HasWinner() {
            if(typeof window.ethereum !== "undefined") {
                const contract = new ethers.Contract(props.address, abi ,props.provider)
                try {
                    const winner = await contract.getLuckyWinnerAddress();
                    console.log(winner.toString())
                    if (winner.toString() === "0x0000000000000000000000000000000000000000") {
                        setHasLuckyWinner(false)
                        console.log(hasLuckyWinner)
                    } else {
                        setHasLuckyWinner(true)
                    }  
                  } catch(err) {
                    console.error('err: ',err)
                  }}
            }
            HasWinner();
            }, []);


        //Get Lucky Winner
        async function GetWinner() {
            if(typeof window.ethereum !== "undefined") {
              const contract = new ethers.Contract(props.address, abi ,props.provider.getSigner())
              try {
                const winner = await contract.chooseLuckyWinner({ gasLimit: 200000});
                const luckyWinnerStr = winner.toString()
                setLuckyWinner(luckyWinnerStr)
                setHasLuckyWinner(true)
                localStorage.setItem('winner', luckyWinnerStr);
                alert("We Got a Lucky Winner!")
              } catch(err) {
                console.error('err: ',err)
              }
            }
          }
              //See Lucky Winner
        async function SeeWinner() {
            if(typeof window.ethereum !== "undefined") {
              const contract = new ethers.Contract(props.address, abi ,props.provider)
              try {
                const winner = await contract.getLuckyWinnerAddress();
                const luckyWinnerStr = winner.toString()
                setLuckyWinner(luckyWinnerStr)
                localStorage.setItem('winner', luckyWinnerStr);
              } catch(err) {
                console.error('err: ',err)
              }
            }
          }

      

return(

    <div>

        <Button func={GetWinner} text="Get Lucky Winner"  color="#B1B1B1" disabled={hasLuckyWinner}/>
        <Button func={SeeWinner} text="See Lucky Winner" color="#B1B1B1" disabled={!hasLuckyWinner}/>
        {luckyWinner ? (
        <h4>{luckyWinner}</h4>
        ) : null}


    </div>


)
}