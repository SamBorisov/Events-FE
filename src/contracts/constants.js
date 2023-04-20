import EventContract from "./EventContract.json";

//API keys
export const APP_INFURA_API_KEY = process.env.INFURA_API_KEY;
export const EtherscanProvider_API_KEY= process.env.ETHERSCAN_API_KEY;

//contract abi
export const abi = EventContract.abi;

//smart contract address
export const eventAddress  = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968";