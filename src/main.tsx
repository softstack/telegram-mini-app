import React from 'react';
import ReactDOM from 'react-dom/client';

// TonConnect UI
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Rainbow Kit
import './polyfills';

import { createWalletConnectModal } from './configs/walletConnect.ts';

// Telegram Mini App SDK
import WebApp from '@twa-dev/sdk';

// App + Styles
import App from './App.tsx';
import './index.css';

// Hide the main button
WebApp.MainButton.hide();
// Expand the Telegram Mini App to full screen
WebApp.expand();
// Initialize the Telegram Mini App SDK
WebApp.ready();
// Enable the closing confirmation
WebApp.enableClosingConfirmation();

// Create the WalletConnect modal
createWalletConnectModal();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <TonConnectUIProvider manifestUrl="https://softstackhq.github.io/telegram-mini-app/tonconnect-manifest.json">
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>
);
