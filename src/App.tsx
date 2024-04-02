import { useState, useEffect } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useTonWallet } from '@tonconnect/ui-react';

import './App.css';

import PrimaryButton from './components/buttons/PrimaryButton';

import WalletConnectModal from './components/connectors/WalletConnectModal';
import TonConnectModal from './components/connectors/TonConnectModal';
import SolanaConnectModal from './components/connectors/SolanaConnectModal';

import avatarPhone from './assets/avatar_phone.png';
import avatarScooter from './assets/avatar_scooter.png';
import avatarTable from './assets/avatar_table.png';
import chevronLeftIcon from './assets/chevron-left.svg';

import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
import solanaConnectIcon from './assets/solana_connect.png';

enum View {
    LANDING = 0,
    CONNECT = 1,
    CONNECTED = 2,
    WALLET = 3,
}

function App() {
    const [view, setView] = useState<View>(View.LANDING);

    const addToHomeScreen = () => {
        setView(View.CONNECT);
    };

    const skip = () => {
        setView(View.CONNECT);
    };
    const goBack = () => {
        if (view === View.LANDING) {
            return;
        }
        setView(view - 1);
    };

    // Wallet Connect
    const { isConnected } = useWeb3ModalAccount();
    useEffect(() => {
        if (view === View.LANDING || view === View.WALLET) {
            return;
        }
        if (isConnected) {
            setView(View.CONNECTED);
        }
    }, [isConnected]);

    // TON Connect
    const tonWallet = useTonWallet();
    useEffect(() => {
        // TON Connect
        console.log(tonWallet);
    }, [tonWallet]);

    // Solana Connect
    useEffect(() => {
        // Solana Connect
    }, []);

    return (
        <>
            <div className="main-component">
                {view === View.LANDING && (
                    <div className="components-container">
                        <div className="skip-button">
                            <span onClick={skip}>Skip</span>
                        </div>
                        <div className="avatar">
                            <img src={avatarScooter} alt="" />
                        </div>
                        <div className="add-to-home">
                            <div>
                                <h2 className="headline">CALL IT HOME</h2>
                            </div>
                            <div>
                                <p className="landing-text">
                                    Catat Keuanganmu dengan Mudah, setiap
                                    pengeluaran dan pemasukan akan terdata rapi
                                </p>
                            </div>
                            <div>
                                <PrimaryButton
                                    title="Add to your Home Screen"
                                    callback={addToHomeScreen}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {view === View.CONNECT && (
                    <div className="components-container">
                        <div className="back-button">
                            <img
                                onClick={goBack}
                                src={chevronLeftIcon}
                                alt="Back"
                            />
                        </div>
                        <div className="avatar" style={{ height: '58%' }}>
                            <img src={avatarPhone} alt="" />
                        </div>
                        <div className="connect-buttons">
                            <h2 className="headline">CONNECT</h2>
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
                )}
                {view === View.CONNECTED && (
                    <div>
                        <div className="components-container">
                            <div className="back-button">
                                <img
                                    onClick={goBack}
                                    src={chevronLeftIcon}
                                    alt="Back"
                                />
                            </div>
                            <div className="avatar" style={{ height: '58%' }}>
                                <img src={avatarTable} alt="" />
                            </div>
                            <div className="connect-buttons">
                                <h2 className="headline">HORRAY!</h2>
                            </div>
                        </div>
                    </div>
                )}
                {view === View.WALLET && <div></div>}
            </div>
        </>
    );
}

export default App;
