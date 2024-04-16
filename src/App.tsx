import { useState, useEffect } from 'react';
// import { useTonWallet } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';

import './App.css';

import Avatar from './components/utils/Avatar';
import BackButton from './components/buttons/BackButton';
import SkipButton from './components/buttons/SkipButton';
import PrimaryButton from './components/buttons/PrimaryButton';
import Tooltip from './components/utils/Tooltip';
import TransactionButton from './components/buttons/TransactionButton';
import TransactionHistoryItem from './components/utils/TransactionHistoryItem';
import ConnectOverlay from './components/connectOverlay/ConnectOverlay';

import EVMConnectModal from './components/connectors/EVMConnectModal';
import TonConnectModal from './components/connectors/TonConnectModal';
// import SolanaConnectModal from './components/connectors/SolanaConnectModal';
// import WalletConnectModal from './components/connectors/WalletConnectModal';

import avatarPhone from './assets/avatar_phone.png';
import avatarScooter from './assets/avatar_scooter.png';
import avatarTable from './assets/avatar_table.png';

import evmConnectIcon from './assets/EVM_connect_logos.png';
// import walletConnectIcon from './assets/wallet_connect.png';
import tonConnectIcon from './assets/ton_connect.png';
// import solanaConnectIcon from './assets/solana_connect.png';
import sendIcon from './assets/send_icon.svg';
import receiveIcon from './assets/receive_icon.svg';
import sellIcon from './assets/sell_icon.svg';
import { useTonWallet } from '@tonconnect/ui-react';

enum View {
    LANDING = 0,
    CONNECT = 1,
    CONNECTED = 2,
    WALLET = 3,
}

WebApp.setHeaderColor('#1a1a1a');

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

    const openWallet = () => {
        setView(View.WALLET);
    };

    // Detect if the user is connected to a web3 provider
    const [account, setAccount] = useState<string | null>(null);
    useEffect(() => {
        if (window.ethereum) {
            (window.ethereum as any)
                .request({ method: 'eth_requestAccounts' })
                .then((res: any) => {
                    setAccount(res[0]);
                    setView(View.CONNECTED);
                });
        }
    }, [window.ethereum]);

    // Get Accounts
    const getAccounts = () => {
        axios
            .get(
                'https://8d58-2a02-8106-21-bc00-20a7-e089-bdb8-452a.ngrok-free.app/accounts',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            )

            .then((response) => {
                console.log(response.data.accounts[0]);
                setAccount(response.data.accounts[0]);
            });
    };

    // const accountEventSource = new EventSource(
    //     'https://8d58-2a02-8106-21-bc00-20a7-e089-bdb8-452a.ngrok-free.app/account-event'
    // );

    // accountEventSource.onmessage = (event) => {
    //     console.log(event.data);
    //     setAccount(event.data);
    // };

    // Handle MainButton changes on view change
    useEffect(() => {
        if (view === View.LANDING) {
            WebApp.MainButton.show();
            WebApp.MainButton.setText('Connect Your Wallet');
            WebApp.MainButton.color = '#007aff';
            WebApp.MainButton.textColor = '#ffffff';
            WebApp.MainButton.onClick(skip);
        }
        if (view === View.CONNECT) {
            WebApp.MainButton.show();
            WebApp.MainButton.disable();
            WebApp.MainButton.text = '_';
            WebApp.MainButton.textColor = '#1a1a1a';
            WebApp.MainButton.color = '#1a1a1a';
        }
        // Change the Main Buttons color and textColor to match telegrams background color, to "hide" the button
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
        if (!tonWallet) return;
        // setAccount(tonWallet.account.address);
        // setView(View.CONNECTED);
    }, [tonWallet]);

    // Solana Connect
    useEffect(() => {
        // Solana Connect
    }, []);

    // Test Functions
    const [signedMessage, setSignedMessage] = useState<string | null>(null);
    const triggerTestMessageSign = () => {
        axios
            .post(
                'https://8d58-2a02-8106-21-bc00-20a7-e089-bdb8-452a.ngrok-free.app/sign',
                {
                    message: 'This is a test message to sign in the wallet.',
                    account: account,
                }
            )
            .then((response) => {
                setSignedMessage(response.data.message);
            });
    };

    const triggerTestMessageToChat = () => {
        // Trigger Test Message to Chat
    };

    // Transaction Functions
    const sendFunds = () => {
        // Send Funds
    };

    const receiveFunds = () => {
        // Receive Funds
    };

    const sell = () => {
        // Sell
    };

    // Connect Overlay
    const [showConnectOverlay, setShowConnectOverlay] = useState(false);
    const [slideAnimation, setSlideAnimation] = useState('in');

    const openConnectOverlay = () => {
        setSlideAnimation('in');
        setTimeout(() => setShowConnectOverlay(true), 100);
    };
    const closeConnectOverlay = () => {
        setSlideAnimation('out');
        setTimeout(() => setShowConnectOverlay(false), 100);
    };

    return (
        <>
            <div className="main-component">
                {view === View.LANDING && (
                    <div className="components-container">
                        <SkipButton skip={skip} />
                        <Avatar src={avatarScooter} />
                        <div className="add-to-home">
                            <div>
                                <h2 className="headline">
                                    Telegram Mini App Demo
                                </h2>
                            </div>
                            <div>
                                <p className="landing-text">
                                    Click on the button below and follow the
                                    instructions to link your wallet to this
                                    telegram mini app demo.
                                </p>
                                <p className="landing-text">
                                    Softstack is a Web3 software development,
                                    cybersecurity and consulting service
                                    partner.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {view === View.CONNECT && (
                    <div className="components-container">
                        <div className="navigation">
                            <BackButton goBack={goBack} />
                            {account && <SkipButton skip={skip} />}
                        </div>
                        <Avatar src={avatarPhone} height="60%" />
                        {signedMessage}
                        {account}
                        <div className="connect-buttons">
                            <h2 className="headline">CONNECT</h2>
                            <PrimaryButton
                                title="get accs"
                                callback={getAccounts}
                            />
                            <PrimaryButton
                                title="sign message"
                                callback={triggerTestMessageSign}
                            />
                            <EVMConnectModal
                                title="EVM Connect"
                                icon={evmConnectIcon}
                                callback={openConnectOverlay}
                            />
                            {/* <WalletConnectModal
                                title="Wallet Connect"
                                icon={walletConnectIcon}
                                accountCallback={setAccount}
                            /> */}
                            {/* {account && (
                                <>
                                    <PrimaryButton
                                        title="Open my Wallet"
                                        callback={skip}
                                    />
                                </>
                            )} */}
                            <TonConnectModal
                                title="TON Connect"
                                icon={tonConnectIcon}
                            />
                            {/* <SolanaConnectModal
                                title="Solana Connect"
                                icon={solanaConnectIcon}
                            /> */}
                        </div>
                        {showConnectOverlay && (
                            <ConnectOverlay
                                close={closeConnectOverlay}
                                slideAnimation={slideAnimation}
                            />
                        )}
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
                                    <p>{account}</p>
                                </div>
                                <div className="wallet-provider-icon">
                                    <img src={tonConnectIcon} alt="" />
                                </div>
                                <div className="wallet-balance-details">
                                    <div className="wallet-balance-header">
                                        <p style={{ color: 'black' }}>
                                            Total Balance
                                        </p>
                                        <Tooltip
                                            headline="Balance"
                                            content="The balance your wallet is currently holding."
                                        />
                                    </div>
                                    <div className="wallet-balance-value">
                                        200
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {view === View.WALLET && (
                    <div>
                        <div className="wallet-details-container">
                            <BackButton goBack={goBack} />
                            <div className="wallet-details-wrapper">
                                <div className="balance-details">
                                    <p className="balance-details-header">
                                        Total Balance
                                    </p>
                                    <p className="balance-details-value">
                                        <span style={{ color: '#707579' }}>
                                            $
                                        </span>
                                        250
                                    </p>
                                </div>
                                <div className="transaction-options">
                                    <TransactionButton
                                        text="Send"
                                        icon={sendIcon}
                                        callback={sendFunds}
                                    />
                                    <TransactionButton
                                        text="Receive"
                                        icon={receiveIcon}
                                        callback={receiveFunds}
                                    />
                                    <TransactionButton
                                        text="Sell"
                                        icon={sellIcon}
                                        callback={sell}
                                    />
                                </div>
                                <div className="transaction-history">
                                    <TransactionHistoryItem
                                        currency="Toncoin"
                                        symbol="TON"
                                        valueSpot={100}
                                        valueFiat={150}
                                    />
                                </div>
                                <div className="test-functions">
                                    <PrimaryButton
                                        title="Sign Test Message in Wallet"
                                        callback={triggerTestMessageSign}
                                    />
                                    <PrimaryButton
                                        title="Trigger Test Message to Chat"
                                        callback={triggerTestMessageToChat}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
