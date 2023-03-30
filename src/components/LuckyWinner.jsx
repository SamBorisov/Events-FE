import React from "react"
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Button from "./Button";


export default function LuckyWinner(props) {

    const [luckyWinner, setLuckyWinner] = useState("");

    const [hasLuckyWinner, setHasLuckyWinner] = useState(false);


    useEffect(() => {
        async function HasWinner() {
            if(typeof window.ethereum !== "undefuned") {
                const contract = new ethers.Contract(props.address, props.abi ,props.provider)
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
            if(typeof window.ethereum !== "undefuned") {
              const contract = new ethers.Contract(props.address, props.abi ,props.provider.getSigner())
              try {
                const winner = await contract.chooseLuckyWinner({ gasLimit: 200000});
                setLuckyWinner(winner.toString())
                setHasLuckyWinner(true)
                alert("We Got a Lucky Winner!")
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

        <Button func={GetWinner} text="Get Lucky Winner"  color="#B1B1B1" disabled={hasLuckyWinner}/>
        <Button func={SeeWinner} text="See Lucky Winner" color="#B1B1B1" disabled={!hasLuckyWinner}/>
        {luckyWinner ? (
        <h4>{luckyWinner}</h4>
        ) : null}


    </div>


)
}