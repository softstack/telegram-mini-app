import React from 'react';
import ConnectButton from '../buttons/ConnectButton';

// import { useWeb3Modal } from '@web3modal/ethers/react';
import WebApp from '@twa-dev/sdk';

type Props = {
    title: string;
    icon: string;
};

const EVMConnectModal: React.FC<Props> = ({ title, icon }) => {
    // const { open } = useWeb3Modal();

    const openModal = () => {
        // open({ view: 'Connect' });
        WebApp.openLink('https://example.walletconnect.org/');
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default EVMConnectModal;
