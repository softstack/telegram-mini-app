import React from 'react';
import WebApp from '@twa-dev/sdk';

import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
    callback: () => void;
};

const EVMConnectModal: React.FC<Props> = ({ title, icon, callback }) => {
    const openModal = () => {
        WebApp.openLink(
            'https://metamask.app.link/dapp/softstackhq.github.io/telegram-mini-app/',
            { try_instant_view: true }
        );
        callback();
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default EVMConnectModal;
