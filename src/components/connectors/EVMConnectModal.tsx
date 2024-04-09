import React from 'react';

import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
    callback: () => void;
};

const EVMConnectModal: React.FC<Props> = ({ title, icon, callback }) => {
    const openModal = () => {
        callback();
    };

    return (
        <>
            <ConnectButton title={title} icon={icon} callback={openModal} />
        </>
    );
};

export default EVMConnectModal;
