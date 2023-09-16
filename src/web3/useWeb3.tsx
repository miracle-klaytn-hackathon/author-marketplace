import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { connectors } from './connectors'
import useLocalStorage from 'hooks/useLocalStorage'

export const useWeb3 = () => {
    const { active, activate, library, account } = useWeb3React<ethers.providers.Web3Provider>()
    const [,setValue] = useLocalStorage("provider", null as unknown)

    const connectWallet = () => {
        return activate(connectors.injected)
            .then(_ => setValue(connectors.injected))
    }

    const getAccountBalance = () => {
        return (account && library) 
            && library.getBalance(account)
                .then(balance => ethers.utils.formatEther(balance)) || null
    }

    const mintNFT = ({tokenAdress, tokenAbi, tokenUri}: {
        tokenAdress: string,
        tokenAbi: string,
        tokenUri: string
    }) => {
        return (account && library) 
            && new ethers.Contract(tokenAdress, tokenAbi, library?.getSigner(account))
                .safeMint(account, tokenUri) as Promise<any>
    }

    return {
        connectWallet: connectWallet,
        walletConnected: active,
        getAccountBalance: getAccountBalance,
        mintNFT: mintNFT
    } as const
}