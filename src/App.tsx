import './App.css';

import ConnectButton from './components/buttons/ConnectButton';

import avatorPhone from './assets/avatar_phone.png';
import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
import solanaConnectIcon from './assets/solana_connect.png';

function App() {
    return (
        <div className="container">
            <div className="main-component">
                <div className="avatar">
                    <img src={avatorPhone} alt="" />
                </div>
                <div className="connect-buttons">
                    <ConnectButton
                        title="Wallet Connect"
                        icon={walletConnectIcon}
                    />
                    <ConnectButton title="TON Connect" icon={tonConnectIcon} />
                    <ConnectButton
                        title="Solana Connect"
                        icon={solanaConnectIcon}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
