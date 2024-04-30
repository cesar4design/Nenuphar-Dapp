import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globalsStyles.css";
import { Helmet } from 'react-helmet';


import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import NavbarComponent from '../components/navbar'

const projectId = '6b3b6a75fab4c023e92097eab4b3c923' // Testing id, Change for your own, recomend use .env file.

export const LineaSepolia = {
  id: 59141,
  name: 'Linea Sepolia',
  network: 'Linea Sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc.sepolia.linea.build'] },
    default: { http: ['https://rpc.sepolia.linea.build'] },
  }
}

const { chains, publicClient } = configureChains(
  [LineaSepolia],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const metadata = {
  name: '',
  description: '',
  url: '/',
  icons: ['']
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),

  ],
  publicClient
})

createWeb3Modal({
  wagmiConfig, projectId, defaultChain: LineaSepolia,
  themeMode: 'dark', chains,
  themeVariables: {
    '--w3m-accent': '#F8BC00'
  }
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Helmet>
        <title>Nenuphar</title>
        <link rel="icon" href="/Favicon.png" />

      </Helmet>

      <WagmiConfig config={wagmiConfig}>
        <SessionProvider session={session}>
          <NavbarComponent />
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </>
  );
}