import React from 'react';
import { useWeb3Modal } from '@web3modal/ethers/react';

import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
    accountCallback: (account: string | null) => void;
};

const WalletConnectModal: React.FC<Props> = ({ title, icon }) => {
    const { open } = useWeb3Modal();

    const connect = async () => {
        open();
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={connect} />
        </>
    );
};

export default WalletConnectModal;
