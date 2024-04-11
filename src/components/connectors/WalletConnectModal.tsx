import React from 'react';

import { EthereumProvider } from '@walletconnect/ethereum-provider';
import WebApp from '@twa-dev/sdk';

// import WalletConnect from '@walletconnect/client';
// import { useWeb3Modal } from '@web3modal/ethers/react';
import ConnectButton from '../buttons/ConnectButton';
import PrimaryButton from '../buttons/PrimaryButton';

type Props = {
    title: string;
    icon: string;
    accountCallback: (account: string | null) => void;
};

const WalletConnectModal: React.FC<Props> = ({
    title,
    icon,
    accountCallback,
}) => {
    const PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '';

    const [uri, setUri] = React.useState<string | null>('No URI received yet');
    const [provider, setProvider] = React.useState<any | null>(null);

    // debug
    const [debugState, setDebugState] =
        React.useState<string>('Init did not start');

    React.useEffect(() => {
        setDebugState('Hook started');
        const init = async () => {
            setDebugState('Init started');
            const provider = await EthereumProvider.init({
                projectId: PROJECT_ID,
                metadata: {
                    name: 'TMA Wallet PoC',
                    description: 'Connect your wallet to a telegram mini app',
                    url: 'https://softstackhq.github.io/telegram-mini-app/', // origin must match your domain & subdomain
                    icons: [''],
                },
                showQrModal: false,
                optionalChains: [1, 137, 2020],
                relayUrl: 'https://relay.walletconnect.org',
                /*Optional - Add custom RPCs for each supported chain*/
                rpcMap: {
                    1: 'mainnet.rpc...',
                    137: 'polygon.rpc...',
                },
            });

            setDebugState('Provider set');

            setProvider(provider);
            accountCallback(provider.accounts[0]);
            provider.on('display_uri', handleURI);
            await provider.connect();

            setDebugState('Connected');
        };

        init();
    }, []);

    const handleURI = async (uri: string) => {
        setUri(uri);
    };

    const connect = async () => {
        if (!uri) {
            return;
        }
        const encodedUri = encodeURIComponent(uri);
        const universalLink = `https://metamask.app.link/wc?uri=${encodedUri}`;
        WebApp.openLink(universalLink);
    };

    // const openModal = () => {
    //     init();
    // };

    const handleDisconnect = async () => {
        if (provider) {
            await provider.disconnect();
            accountCallback(null);
            setProvider(null);
        }
    };

    return (
        <>
            {debugState}
            {uri}
            {provider ? (
                <PrimaryButton title="Disconnect" callback={handleDisconnect} />
            ) : (
                <ConnectButton title={title} icon={icon} callback={connect} />
            )}
        </>
    );
};

export default WalletConnectModal;
