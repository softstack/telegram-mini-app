import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { Buffer } from 'buffer';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Rainbow Kit
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import WebApp from '@twa-dev/sdk';
import App from './App.tsx';
import './index.css';

window.Buffer = Buffer;

// Initialize the Telegram Mini App SDK
WebApp.ready();
// Expand the Telegram Mini App to full screen
WebApp.expand();
// Activate the haptic feedback
WebApp.HapticFeedback.impactOccurred('light');

// Wallet Connect Config
// 1. Get projectId
const projectId = '10bc66667bce58aa9b1b9284ac74e731';

// 2. Set chains
const mainnet_config = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create a metadata object
const metadata = {
    name: 'TMA Proof of Concept',
    description: 'Telegram Mini App Wallet Proof of Concept',
    url: 'https://softstackhq.github.io/telegram-mini-app/', // origin must match your domain & subdomain
    icons: [''],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet_config],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

// Rainbow Kit
const rainbow_config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: projectId,
    chains: [mainnet, polygon, optimism, arbitrum, base],
});

const queryClient = new QueryClient();

// Solana Context
const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

    const wallets = React.useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
        ],
        [network]
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider config={rainbow_config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <TonConnectUIProvider manifestUrl="https://softstackhq.github.io/telegram-mini-app/tonconnect-manifest.json">
                        <Context>
                            <App />
                        </Context>
                    </TonConnectUIProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
