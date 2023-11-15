import { Web3ReactProvider } from "@web3-react/core"
import { ethers } from "ethers"

const getLibrary = (provider: any) => {
  const library = new ethers.BrowserProvider(provider)
  library.pollingInterval = 8000 // frequency provider is polling
  return library
}

const Web3Provider = ({ children }: any) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  )
}

export default Web3Provider
