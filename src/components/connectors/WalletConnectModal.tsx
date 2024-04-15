import React from 'react';
import axios from 'axios';
// import WebApp from '@twa-dev/sdk';

import ConnectButton from '../buttons/ConnectButton';

type Props = {
    title: string;
    icon: string;
    accountCallback: (account: string | null) => void;
};

const WalletConnectModal: React.FC<Props> = ({ title, icon }) => {
    const [uri, setUri] = React.useState<string | null>(null);

    const connect = async () => {
        // Post request to localhost:3000/connect with axios
        axios
            .post(
                'https://8d58-2a02-8106-21-bc00-20a7-e089-bdb8-452a.ngrok-free.app/connect'
            )
            .then((response) => {
                // Set uri with response data
                console.log(response.data);
                setUri(response.data.universalLink);
            });
    };

    return (
        <>
            {uri}
            <ConnectButton title={title} icon={icon} callback={connect} />
        </>
    );
};

export default WalletConnectModal;
