import React from 'react';

import { EthereumProvider } from '@walletconnect/ethereum-provider';
import WebApp from '@twa-dev/sdk';

// import WalletConnect from '@walletconnect/client';
// import { useWeb3Modal } from '@web3modal/ethers/react';
import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
};

const WalletConnectModal: React.FC<Props> = ({ title, icon }) => {
    // const [provider, setProvider] = useState<any>(null);

    const PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '';

    const init = async () => {
        const provider = await EthereumProvider.init({
            projectId: PROJECT_ID,
            metadata: {
                name: 'TMA Wallet PoC',
                description: 'Connect your wallet to a telegram mini app',
                url: 'https://softstackhq.github.io/telegram-mini-app/', // origin must match your domain & subdomain
                icons: ['https://avatars.githubusercontent.com/u/37784886'],
            },
            showQrModal: false,
            optionalChains: [1, 137, 2020],

            /*Optional - Add custom RPCs for each supported chain*/
            rpcMap: {
                1: 'mainnet.rpc...',
                137: 'polygon.rpc...',
            },
        });
        provider.on('display_uri', handleURI);
        await provider.connect();
    };

    const handleURI = async (uri: string) => {
        console.log('uri', uri);
        const encodedUri = encodeURIComponent(uri);
        const universalLink = `https://mywallet.com/wc?uri=${encodedUri}`;
        WebApp.openLink(universalLink);
    };

    const openModal = () => {
        init();
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default WalletConnectModal;
