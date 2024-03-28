import React from 'react';
import ReactDOM from 'react-dom/client';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import WebApp from '@twa-dev/sdk';
import App from './App.tsx';
import './index.css';

// Initialize the Telegram Mini App SDK
WebApp.ready();
// Expand the Telegram Mini App SDK to full screen
WebApp.expand();

// 1. Get projectId
const projectId = '10bc66667bce58aa9b1b9284ac74e731';

// 2. Set chains
const mainnet = {
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
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
