import './App.css';

import WalletConnectModal from './components/connectors/WalletConnectModal';
import TonConnectModal from './components/connectors/TonConnectModal';
import SolanaConnectModal from './components/connectors/SolanaConnectModal';

import avatorPhone from './assets/avatar_phone.png';
import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
import solanaConnectIcon from './assets/solana_connect.png';

function App() {
    return (
        <>
            <div className="main-component">
                <div className="avatar">
                    <img src={avatorPhone} alt="" />
                </div>
                <div className="connect-buttons">
                    <WalletConnectModal
                        title="Wallet Connect"
                        icon={walletConnectIcon}
                    />
                    <TonConnectModal
                        title="TON Connect"
                        icon={tonConnectIcon}
                    />
                    <SolanaConnectModal
                        title="Solana Connect"
                        icon={solanaConnectIcon}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
