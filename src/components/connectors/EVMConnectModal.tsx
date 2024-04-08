import React from 'react';
import ConnectButton from '../buttons/ConnectButton';

import WebApp from '@twa-dev/sdk';

type Props = {
    title: string;
    icon: string;
};

const EVMConnectModal: React.FC<Props> = ({ title, icon }) => {
    const openModal = () => {
        WebApp.openLink('https://example.walletconnect.org/');
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default EVMConnectModal;
