import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
// import { Web3Provider } from "@ethersproject/providers";

// function getLibrary(provider: any) {
//   return new Web3Provider(provider);
// }
const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const WebProvider = ({ children }: any) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    // <div>{children}</div>
  );
};

export default WebProvider;
