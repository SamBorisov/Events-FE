import React, {useState} from 'react';
import EventContract from "./contracts/EventContract.json";

import Button from './components/Button';
import TokenImage from './components/GetNFT';
import LuckyWinner from './components/LuckyWinner';
import Timers from './components/Timers';

import { init, useConnectWallet } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { APP_INFURA_API_KEY } from './contracts/constants';
import { ethers } from 'ethers';

const cl = input => console.log(input)

//smart contract address
const eventAddress  = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";

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

  const [amount, setAmount] = useState(0);
  const [ticketBalance, setTicketBalance] = useState("");



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
          setTicketBalance(data.toString())
        } catch(err) {
          cl('err: ',err)
        }
      }
    }

 
    // buy tickets
      const handleSubmit = async (event) => {
        if(typeof window.ethereum !== "undefuned") {
        const contract = new ethers.Contract(eventAddress, EventContract.abi ,provider.getSigner())
        event.preventDefault();
        const price = await contract.priceForEvent();
        const value = ethers.utils.parseEther((price * amount).toString());
        try {
          const tx = await contract.buyTickets(amount, { gasLimit: 200000, value: value });
          await tx.wait();
          cl('Transaction successful:', tx.hash);
        } catch (error) {
          cl('Transaction failed:', error);
        }
      };
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
              <h3>Wellcome</h3>
              <Button func={CheckBalance} text={`Balance: ${ticketBalance}`} color="#B1B1B1"/>
              <form>
                <label>
                 <h4>Number of tickets:</h4>
                  <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <Button func={handleSubmit} text="Buy tickets" color="#B1B1B1"/>
              </form>

              <TokenImage address={eventAddress}  abi={EventContract.abi} provider={provider}/>

             <LuckyWinner address={eventAddress}  abi={EventContract.abi} provider={provider}/>

             <Timers address={eventAddress}  abi={EventContract.abi} provider={provider}/>

            </div>
        }


             
        </div>
        
    )
}