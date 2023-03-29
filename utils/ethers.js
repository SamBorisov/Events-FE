import { ethers } from 'ethers';

const getProvider = () => {
  const providerUrl = 'http://localhost:8545';
  return new ethers.providers.JsonRpcProvider(providerUrl);
};

export const getSigner = async () => {
  const provider = getProvider();
  const accounts = await provider.listAccounts();
  const signer = provider.getSigner(accounts[0]);
  return signer;
};

export const getContract = (abi, address) => {
  const signer = getSigner();
  const contract = new ethers.Contract(address, abi, signer);
  return contract;
};
