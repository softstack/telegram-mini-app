import React from 'react';
import './polyfills';
import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Metamask SDK
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import { metamaskConfig } from './configs/metamask.ts';

// Rainbow Kit
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { rainbowConfig } from './configs/rainbowKit.ts';

import WebApp from '@twa-dev/sdk';
import App from './App.tsx';
import './index.css';

// Initialize the Telegram Mini App SDK
WebApp.ready();
// Expand the Telegram Mini App to full screen
WebApp.expand();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiProvider config={rainbowConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <TonConnectUIProvider manifestUrl="https://softstackhq.github.io/telegram-mini-app/tonconnect-manifest.json">
                        <MetaMaskUIProvider sdkOptions={metamaskConfig}>
                            <App />
                        </MetaMaskUIProvider>
                    </TonConnectUIProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
