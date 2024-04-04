import { useState, useEffect } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useTonWallet } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

import './App.css';

// import PrimaryButton from './components/buttons/PrimaryButton';
import Avatar from './components/utils/Avatar';
import BackButton from './components/buttons/BackButton';
import SkipButton from './components/buttons/SkipButton';

import WalletConnectModal from './components/connectors/WalletConnectModal';
import TonConnectModal from './components/connectors/TonConnectModal';
import SolanaConnectModal from './components/connectors/SolanaConnectModal';

import avatarPhone from './assets/avatar_phone.png';
import avatarScooter from './assets/avatar_scooter.png';
import avatarTable from './assets/avatar_table.png';

import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
import solanaConnectIcon from './assets/solana_connect.png';

enum View {
    LANDING = 0,
    CONNECT = 1,
    CONNECTED = 2,
    WALLET = 3,
}

WebApp.MainButton.enable();
WebApp.MainButton.color = '#007aff';
WebApp.MainButton.setText('Add to your Home Screen');
WebApp.MainButton.show();

function App() {
    const [view, setView] = useState<View>(View.LANDING);

    const skip = () => {
        setView(view + 1);
    };
    const goBack = () => {
        if (view === View.LANDING) {
            return;
        }
        setView(view - 1);
    };

    const addToHomeScreen = () => {
        setView(View.CONNECT);
    };

    const openWallet = () => {
        setView(View.WALLET);
    };

    // Wallet Connect
    const { address, isConnected } = useWeb3ModalAccount();
    useEffect(() => {
        if (view === View.LANDING || view === View.WALLET) {
            return;
        }
        if (isConnected) {
            setView(View.CONNECTED);
        }
    }, [isConnected]);

    // Handle MainButton changes on view change
    useEffect(() => {
        if (view === View.LANDING) {
            WebApp.MainButton.show();
            WebApp.MainButton.setText('Add to your Home Screen');
            WebApp.MainButton.color = '#007aff';
            WebApp.MainButton.textColor = '#ffffff';
            WebApp.MainButton.onClick(addToHomeScreen);
        }
        if (view === View.CONNECT) {
            WebApp.MainButton.show();
            WebApp.MainButton.disable();
            WebApp.MainButton.text = '_';
            WebApp.MainButton.textColor = '#1a1a1a';
            WebApp.MainButton.color = '#1a1a1a';
        }
        if (view === View.CONNECTED) {
            WebApp.MainButton.show();
            WebApp.MainButton.setText('Open my Wallet');
            WebApp.MainButton.color = '#007aff';
            WebApp.MainButton.textColor = '#ffffff';
            WebApp.MainButton.onClick(openWallet);
        }
        if (view === View.WALLET) {
            WebApp.MainButton.show();
            WebApp.MainButton.color = '#007aff';
            WebApp.MainButton.textColor = '#ffffff';
            WebApp.MainButton.setText('Contact Sales');
        }
    }, [view]);

    // TON Connect
    const tonWallet = useTonWallet();
    useEffect(() => {
        // TON Connect
        // console.log(tonWallet);
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
                        <SkipButton skip={skip} />
                        <Avatar src={avatarScooter} />
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
                        </div>
                        {/* <div className="button-container">
                            <PrimaryButton
                                title="Add to your Home Screen"
                                callback={addToHomeScreen}
                            />
                        </div> */}
                    </div>
                )}
                {view === View.CONNECT && (
                    <div className="components-container">
                        <div className="navigation">
                            <BackButton goBack={goBack} />
                            {isConnected && <SkipButton skip={skip} />}
                        </div>
                        <Avatar src={avatarPhone} height="60%" />
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
                            <BackButton goBack={goBack} />
                            <Avatar src={avatarTable} height="60%" />
                            <div className="wallet-overview">
                                <h2 className="headline">HORRAY!</h2>
                                <div className="address-container">
                                    <p>{address}</p>
                                </div>
                            </div>
                            {/* <div className="button-container">
                                <PrimaryButton
                                    title="Open my Wallet"
                                    callback={openWallet}
                                />
                            </div> */}
                        </div>
                    </div>
                )}
                {view === View.WALLET && (
                    <div>
                        <div className="components-container">
                            <BackButton goBack={goBack} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
