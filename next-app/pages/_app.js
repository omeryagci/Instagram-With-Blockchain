import '../styles/globals.css'
import { ModalProvider } from 'react-modal-hook'
import 'react-toastify/dist/ReactToastify.css'

import { AppProvider } from '../context/context'

import { chain, configureChains, createClient, WagmiConfig} from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider, darkTheme} from '@rainbow-me/rainbowkit'

import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const { chains, provider} = configureChains([chain.goerli, chain.localhost], [infuraProvider({priority: 1, apiKey: process.env.INFURA_API_KEY}), jsonRpcProvider({priority: 2, rpc: chain => ({ http : 'HTTP://127.0.0.1:7545' })})])

const { connectors } = getDefaultWallets({
  appName: 'Instagram',
  chains,
})

const wagmiConfig = createClient ({
  autoConnect: true,
  connectors,
  provider,
})


const MyApp = ({ Component, pageProps }) => {
  return (
    <ModalProvider>
      <WagmiConfig client={wagmiConfig}>
       <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
        <AppProvider>
        <Component {...pageProps} />
        </AppProvider>
       </RainbowKitProvider>
      </WagmiConfig>
    </ModalProvider>
  )
}

export default MyApp
