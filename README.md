# Events FE

Contracts - `https://github.com/SamBorisov/Events` 

## Components
- App.jsx - for wallet integration , buy tickets fuctionality and check ticket balance (import abi and have the contract address there)
- Button.jsx - helper button component
- Event - fetches the nessesery details about the event and render them
- Timer - Fetches the current timestamp and he end of the tickets sale (see them by clicking on the btn)
- Lucky Winner - fetch to see if there is one(disable the btn "see lucky winner" if not any, and functions to get the lucky winner (after event ends)  and see his adress after it was chosen

## Usage
- Install necessary packages: `npm install`
- Start the React App: `npm start`


## Usage with Contracts
- Install necessary packages: `npm install`
- Compile the contracts: `npx hardhat compile`
- Set a local node: `npx hardhat node`
- Deploy to localhost: `npx hardhat run .\scripts\deploy.js` (Chck if the address is the same on the front-end)
- Connect your Metamask wallet to localhost (if not set). <br>
![image](https://user-images.githubusercontent.com/88675952/229177094-acde568b-94a7-4c93-9f69-6e15a3513c61.png)
- Insert a private key from the Hardhat node with ether to Metamask to interact with the contracts.
![image](https://user-images.githubusercontent.com/88675952/229177869-0aa97b9f-99e7-4d13-9352-a218421d599d.png)
- Click the "Balance" button to see your ticket balance. Choose a number for the number of tickets you want to buy and press the "Buy Tickets" button. You can see the current and end time by clicking on the "BTN current and end time". After the sale ends, you can call "Get Lucky Winner" and see the lucky winner's address after it was chosen. (there should be at least 1 bought ticket)
- If you encounter problems with the blocks number (change the network then go again to localhost) or nonce, reset your Metamask account from settings/advanced.<br>
![image](https://user-images.githubusercontent.com/88675952/229178583-d31f8c84-3da9-40f5-af46-7283983ddf04.png)
