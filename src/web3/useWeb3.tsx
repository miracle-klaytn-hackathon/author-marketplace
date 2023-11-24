import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { connectors } from './connectors'
import useLocalStorage from 'hooks/useLocalStorage'
import { SiweMessage } from "siwe"

export const useWeb3 = () => {
    const { active, activate, library, account } = useWeb3React<ethers.BrowserProvider>()
    const [, setValue] = useLocalStorage("provider", null as unknown)

    const connectWallet = () => {
        return activate(connectors.injected)
            .then(_ => setValue(connectors.injected))
    }

    const getAccountBalance = () => {
        return (account && library)
            && library.getBalance(account)
                .then(balance => ethers.formatEther(balance)) || null
    }

    const mintNFT = async ({ tokenAdress, tokenAbi, tokenUri }: {
        tokenAdress: string,
        tokenAbi: string,
        tokenUri: string
    }) => {
        return (account && library)
            && new ethers.Contract(tokenAdress, tokenAbi, await library?.getSigner(account))
                .safeMint(account, tokenUri) as Promise<any>
    }

    const createSiweMessage = async (nonce: string) =>
        library && Promise.all([library.getSigner(), library.getNetwork()])
            .then(async resolves => {
                const issuedAt = new Date()
                const expirationTime = new Date(issuedAt.getTime() + 30 * 60000)
                const message = new SiweMessage({
                    domain: "localhost",
                    address: resolves[0]?.address,
                    statement: "This is a test statement",
                    uri: "http://localhost",
                    version: "1",
                    chainId: resolves[1]?.chainId as unknown as number,
                    issuedAt: issuedAt.toISOString(),
                    expirationTime: expirationTime.toISOString(),
                    nonce
                }).prepareMessage();
                const signature = await resolves[0]?.signMessage(message)
                return {
                    message: message,
                    signatrure: signature
                }
            })

    return {
        connectWallet: connectWallet,
        walletConnected: active,
        getAccountBalance: getAccountBalance,
        mintNFT: mintNFT,
        createSiweMessage: createSiweMessage
    } as const
}