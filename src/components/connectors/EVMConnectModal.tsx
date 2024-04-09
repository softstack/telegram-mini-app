import React from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
    callback: () => void;
};

const EVMConnectModal: React.FC<Props> = ({ title, icon, callback }) => {
    const { openConnectModal } = useConnectModal();
    const openModal = () => {
        callback();

        // openConnectModal();
    };

    return (
        <>
            {/* {openConnectModal && (
                <ConnectButton
                    title={title}
                    icon={icon}
                    callback={openConnectModal}
                />
            )} */}
            <ConnectButton />
        </>
    );
};

export default EVMConnectModal;
