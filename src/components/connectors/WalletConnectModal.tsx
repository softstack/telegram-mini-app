import React from 'react';
import ConnectButton from '../buttons/ConnectButton';

import { useWeb3Modal } from '@web3modal/ethers/react';

type Props = {
    title: string;
    icon: string;
    // callback: (promise: Promise<string>) => void;
};

const WalletConnectModal: React.FC<Props> = ({ title, icon }) => {
    const { open } = useWeb3Modal();

    const openModal = () => {
        const promise = open({ view: 'Connect' });

        if (promise) {
            console.log(promise);
            promise.then((result) => {
                console.log(result);
            });
        }
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default WalletConnectModal;
