import React from 'react';
import ConnectButton from '../buttons/ConnectButton';

import { useTonConnectModal } from '@tonconnect/ui-react';

type Props = {
    title: string;
    icon: string;
};

const TonConnectModal: React.FC<Props> = ({ title, icon }) => {
    const { open } = useTonConnectModal();

    const openModal = () => {
        open();
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default TonConnectModal;
