import React from 'react';
import ReactDOM from 'react-dom/client';

// TonConnect UI
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Rainbow Kit
import './polyfills';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { rainbowConfig } from './configs/rainbowKit.ts';
import { createWalletConnectModal } from './configs/walletConnect.ts';

// Telegram Mini App SDK
import WebApp from '@twa-dev/sdk';

// App + Styles
import App from './App.tsx';
import './index.css';

// Expand the Telegram Mini App to full screen
WebApp.expand();

WebApp.SettingsButton.hide();
WebApp.MainButton.hide();
// Initialize the Telegram Mini App SDK
WebApp.ready();
// Enable the closing confirmation
WebApp.enableClosingConfirmation();

// Initialize the React Query client
const queryClient = new QueryClient();

// Create the WalletConnect modal
createWalletConnectModal();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <WagmiProvider config={rainbowConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <TonConnectUIProvider manifestUrl="https://softstackhq.github.io/telegram-mini-app/tonconnect-manifest.json">
                        <App />
                    </TonConnectUIProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
