import React, {useState} from 'react';

import Button from './components/Button';
import Event from './components/Event';
import LuckyWinner from './components/LuckyWinner';

import { init, useConnectWallet, useWallets } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import { APP_INFURA_API_KEY, abi, eventAddress } from './contracts/constants';
import { ethers } from 'ethers';

const cl = input => console.log(input)


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

  const connectedWallets = useWallets()

  const [amount, setAmount] = useState(0);
  const [ticketBalance, setTicketBalance] = useState(() => {
    const storedBalance = localStorage.getItem('ticketBalance');
    return storedBalance === null ? 0 : storedBalance 
  });





    //conect wallet
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    
    if (wallet) {
        var provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
        cl(wallet.accounts[0].address)
      }

    //Check Ticket Balance 
    // async function CheckBalance() {
    //   if(typeof window.ethereum !== "undefined") {
    //     const contract = new ethers.Contract(eventAddress, abi ,provider)
    //     try {
    //       const data = await contract.getTicketBalance();
    //       localStorage.setItem('ticketBalance', ticketBalance);
    //       cl(data.toString())
    //       setTicketBalance(data.toString())
    //     } catch(err) {
    //       cl('err: ',err)
    //     }
    //   }
    // }

 
    // buy tickets
      const handleSubmit = async (event) => {
        if(typeof window.ethereum !== "undefined") {
        const contract = new ethers.Contract(eventAddress, abi ,provider.getSigner())
        event.preventDefault();
        const amonthToNum = parseInt(amount);
        const stateTicketNum = parseInt(ticketBalance);
        const price = await contract.priceForEvent();
        const value = ethers.utils.parseEther((price * amonthToNum).toString());
        try {
          if (typeof amonthToNum === 'number' && amonthToNum > 0 && amonthToNum % 1 === 0) {
            const tx = await contract.buyTickets(amonthToNum, { gasLimit: 200000, value: value });
            await tx.wait();
            cl('Transaction successful:', tx.hash);
            alert('Transaction successful:' + tx.hash)
            localStorage.setItem('ticketBalance', stateTicketNum + amonthToNum);
            setTicketBalance(stateTicketNum + amonthToNum)
          } else {
            cl("Not valid amount of tickets")
            alert("Not valid amount of tickets")
          }
        } catch (error) {
          cl('Transaction failed:', error);
          alert('Transaction failed: Make sure you have enough ETH and the sale is still on!');
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
              <h3>Welcome</h3>

              <Event address={eventAddress}  provider={provider}/>

              <form>
                <label>
                 <h4>Number of tickets: {ticketBalance}</h4>
                  <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <Button func={handleSubmit} text="Buy tickets" color="#B1B1B1"/>
              </form>

             <LuckyWinner address={eventAddress} provider={provider}/>

            </div>
        }


             
        </div>
        
    )
}