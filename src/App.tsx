import './App.css';

import ConnectButton from './components/buttons/ConnectButton';

import avatorPhone from './assets/avatar_phone.png';
import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
import solanaConnectIcon from './assets/solana_connect.png';

import { useWeb3Modal } from '@web3modal/ethers/react';

function App() {
    const { open } = useWeb3Modal();

    const walletConnectCallback = () => {
        open();
    };

    const tonConnectCallback = () => {
        console.log('TON Connect');
    };

    const solanaConnectCallback = () => {
        console.log('Solana Connect');
    };

    return (
        <>
            <div className="main-component">
                <div className="avatar">
                    <img src={avatorPhone} alt="" />
                </div>
                <div className="connect-buttons">
                    <ConnectButton
                        title="Wallet Connect"
                        icon={walletConnectIcon}
                        callback={walletConnectCallback}
                    />
                    <ConnectButton
                        title="TON Connect"
                        icon={tonConnectIcon}
                        callback={tonConnectCallback}
                    />
                    <ConnectButton
                        title="Solana Connect"
                        icon={solanaConnectIcon}
                        callback={solanaConnectCallback}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
