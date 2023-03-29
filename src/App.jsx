import React from 'react';
import EventContract from "./contracts/EventContract.json";

import Button from './components/Button';

import { init, useConnectWallet } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { APP_INFURA_API_KEY } from './contracts/constants';
import { ethers } from 'ethers';

const cl = input => console.log(input)

//smart contract address
const eventAddress  = "0x61c36a8d610163660E21a8b7359e1Cac0C9133e1";

// for wallet connection
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/' + APP_INFURA_API_KEY;
const LOCALHOST = 'http://localhost:8545';

const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: '0x31337',
      token: 'ETH',
      label: 'Localhost 8545',
      rpcUrl: LOCALHOST
    }
  ]
})


export default function App() {

    //conect wallet
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    
    if (wallet) {
        var provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
        console.log(wallet.accounts[0].address)
      }

    //Check Ticket Balance 
    async function CheckBalance() {
      if(typeof window.ethereum !== "undefuned") {
        const contract = new ethers.Contract(eventAddress, EventContract.abi ,provider)
        try {
          const data = await contract.getTicketBalance();
          cl(data.toString())
        } catch(err) {
          cl('err: ',err)
        }
      }
    }

    async function BuyTicket() {
      if(typeof window.ethereum !== "undefuned") {
        const contract = new ethers.Contract(eventAddress, EventContract.abi ,provider)
        try {
          const data = await contract.buyTickets(1);
          cl(data.toString())
        } catch(err) {
          cl('err: ',err)
        }
      }
    }
    
      async function buyTickets(amount) {
        if(typeof window.ethereum !== "undefuned") {
          const contract = new ethers.Contract(eventAddress, EventContract.abi ,provider)
        try {
          const price = await contract.methods.priceForEvent().call();
          const value = web3.utils.toWei((price * amount).toString(), 'ether'); // calculate the amount of ETH to send
          const receipt = await contract.methods.buyTickets(amount).send({ value }); // call the function and send the ETH
          console.log(receipt); // log the transaction receipt
        } catch (error) {
          console.error(error); // handle any errors that occur
        }
      }
      }




    return(
        <div>
        {!wallet ? 
          <div>
            <h3 style={{paddingTop:"10%"}}>Welcome, please connect your wallet to use this App!</h3>
            <Button func={() => (wallet ? disconnect(wallet) : connect())} text={connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'} color="#B1B1B1"/>
            </div>
        :
            <div>
              <h1>Wellcome</h1>
              <Button func={CheckBalance} text="Check Balance" color="#B1B1B1"/>
              <Button func={buyTickets} text="Call" color="#B1B1B1"/>
            </div>
        }


             
        </div>
        
    )
}