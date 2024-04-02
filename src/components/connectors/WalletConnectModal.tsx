import React from 'react';
import ConnectButton from '../buttons/ConnectButton';

import { useWeb3Modal } from '@web3modal/ethers/react';

type Props = {
    title: string;
    icon: string;
};

const WalletConnectModal: React.FC<Props> = ({ title, icon }) => {
    const { open } = useWeb3Modal();

    const openModal = () => {
        open({ view: 'Connect' });
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default WalletConnectModal;
