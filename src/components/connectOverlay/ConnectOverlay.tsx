import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { PulseLoader } from 'react-spinners';

import NetworkBadge from './NetworkBadge';
import WalletBadge from './WalletBadge';
import PrimaryButton from '../buttons/PrimaryButton';

import crossIcon from '../../assets/cross_icon.svg';
import upCircleIcon from '../../assets/up_circle_icon.svg';
import downCircleIcon from '../../assets/down_circle_icon.svg';
import ethereumLogo from '../../assets/ethereum_logo.svg';
import tezosLogo from '../../assets/tezos_logo.png';
import metamaskLogo from '../../assets/metamask_logo.svg';
import trustWalletLogo from '../../assets/trust_wallet.svg';
import templeLogo from '../../assets/temple_logo.svg';
import accountIconPlaceholder from '../../assets/account_placeholder.svg';
import copyIcon from '../../assets/copy_icon.svg';
import documentIcon from '../../assets/document_icon.svg';
import dangerIcon from '../../assets/danger_icon.svg';

import { truncateText } from '../../utils/truncateText';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { setConnectionState } from '../../redux/connectionSlice';

import './ConnectOverlay.css';

type Props = {
    slideAnimation: string;
    account?: string | null;
    close: () => void;
    onConnect: () => void;
};

const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || '';

const ConnectOverlay: React.FC<Props> = ({
    slideAnimation,
    account,
    close,
    onConnect,
}) => {
    // Redux
    const connectionState = useSelector(
        (state: RootState) => state.connection.connectionState
    );
    const dispatch = useDispatch<AppDispatch>();

    // Dark Mode
    const [darkMode, setDarkMode] = useState<boolean>(
        WebApp.colorScheme === 'dark'
    );
    useEffect(() => {
        setDarkMode(WebApp.colorScheme === 'dark');
        document.documentElement.classList.toggle('dark', darkMode);
        window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [WebApp.colorScheme]);

    const [networksExpanded, setNetworksExpanded] = useState(true);
    const [ethereumWalletsExpanded, setEthereumWalletsExpanded] =
        useState(false);
    const [tezosWalletsExpanded, setTezosWalletsExpanded] = useState(false);

    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };

    const [metaMaskSelected, setMetaMaskSelected] = useState<boolean>(false);
    const [trustWalletSelected, setTrustWalletSelected] =
        useState<boolean>(false);

    // handle connect overlay close
    const handleClose = () => {
        if (connectionState === 'connecting') {
            dispatch(setConnectionState('disconnected'));
        }
        close();
    };

    // connect function
    const connectWallet = async (wallet: string | null) => {
        if (!wallet) return;
        if (wallet === 'metamask') {
            setMetaMaskSelected(true);
            setTrustWalletSelected(false);
        }
        if (wallet === 'trust') {
            setMetaMaskSelected(false);
            setTrustWalletSelected(true);
        }

        try {
            dispatch(setConnectionState('connecting'));

            window.localStorage.removeItem('walletconnect');
            window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');

            const response = await axios.post(BRIDGE_URL + '/init-provider', {
                wallet: wallet,
            });
            const providerId = response.data.providerId;
            const uri = response.data.uri;

            window.localStorage.setItem('providerId', providerId);
            window.localStorage.setItem('walletConnectURI', uri);
            window.localStorage.setItem('walletProvider', wallet);

            WebApp.openLink(response.data.universalLink);

            const startTime = Date.now(); // Record start time
            const timeout = 30000; // 30 seconds timeout

            // Function to check connection status
            const checkConnection = async () => {
                if (Date.now() - startTime > timeout) {
                    return;
                }

                try {
                    const statusResponse = await axios.post(
                        BRIDGE_URL + '/is-connected',
                        {
                            providerId: providerId,
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'ngrok-skip-browser-warning': 'true',
                            },
                        }
                    );
                    if (statusResponse.data.connected) {
                        onConnect();
                    } else {
                        console.log('Not Connected, checking again...');
                        setTimeout(checkConnection, 1000);
                    }
                } catch (error) {
                    console.error('Error checking connection:', error);
                    setTimeout(checkConnection, 1000);
                }
            };

            // Start checking connection status
            checkConnection();
        } catch (error: any) {
            console.log('Error connecting wallet:', error);
            dispatch(setConnectionState('error'));
        }
    };

    // Network Selection
    const [ethereumSelected, setEthereumSelected] = useState(false);
    const [tezosSelected, setTezosSelected] = useState(false);

    // Toggle Wallets
    const toggleWallets = () => {
        if (ethereumSelected) {
            setEthereumWalletsExpanded(!ethereumWalletsExpanded);
        }
        if (tezosSelected) {
            setTezosWalletsExpanded(!tezosWalletsExpanded);
        }
    };

    const showAvailableWallets = (network: string) => {
        if (network === 'ethereum') {
            setEthereumSelected(true);
            setTezosSelected(false);
            setTezosWalletsExpanded(false);
            setEthereumWalletsExpanded(true);
        }
        if (network === 'tezos') {
            setEthereumSelected(false);
            setTezosSelected(true);
            setEthereumWalletsExpanded(false);
            setTezosWalletsExpanded(true);
        }
    };

    // Copy Account to Clipboard
    const copyAccountToClipboard = () => {
        if (!account) return;
        navigator.clipboard.writeText(account);
        WebApp.showPopup({ message: 'Address copied to clipboard!' });
    };

    // View on Explorer
    const viewOnExplorer = () => {
        if (!account) return;
        WebApp.openLink(`https://etherscan.io/address/${account}`);
    };

    // Handle Disconnect
    const handleDisconnect = async () => {
        window.localStorage.removeItem('providerId');
        window.localStorage.removeItem('walletConnectURI');
        window.localStorage.removeItem('walletProvider');
        window.localStorage.removeItem('walletconnect');
        window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
        dispatch(setConnectionState('disconnected'));

        await axios.post(BRIDGE_URL + '/disconnect', {
            providerId: window.localStorage.getItem('providerId'),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    // Handle Reconnect
    const handleReconnect = () => {
        dispatch(setConnectionState('disconnected'));
    };

    return (
        <div
            className={`connect-overlay ${slideAnimation}`}
            style={
                darkMode
                    ? {
                          backgroundColor: '#262233',
                      }
                    : {}
            }
        >
            <div className="flex justify-between text-left py-3 px-4">
                {connectionState === 'connecting' && (
                    <p className="m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor">
                        Connecting
                    </p>
                )}
                {connectionState === 'disconnected' && (
                    <p className="m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor">
                        Connect Wallet
                    </p>
                )}
                {connectionState === 'connected' && (
                    <p className="m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor">
                        Account Details
                    </p>
                )}
                {connectionState === 'error' && (
                    <p className="m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor">
                        Connection Error
                    </p>
                )}
                {connectionState === 'retrying' && (
                    <p className="m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor">
                        Retrying
                    </p>
                )}
                <div
                    onClick={handleClose}
                    className="flex items-center cursor-pointer"
                >
                    <img src={crossIcon} alt="" />
                </div>
            </div>
            <hr className="m-0 border-t-1 border-solid border-customGrayLine" />
            {connectionState === 'connecting' && (
                <>
                    <div className="my-10">
                        <PulseLoader
                            size={12}
                            margin={5}
                            color={darkMode ? '#DEDEDE' : '#2D2D2D'}
                        />
                    </div>
                    <div>
                        <p className="text-lg m-4 mt-2 dark:text-customDarkModeTextColor">
                            Connecting Wallet
                        </p>
                    </div>
                    <div>
                        <p className="m-4 mb-8 px-10 dark:text-customDarkModeTextColor">
                            Please connect your Wallet & approve transaction
                        </p>
                    </div>
                </>
            )}
            {connectionState === 'disconnected' && (
                <>
                    <div className="flex py-4 px-5 justify-between">
                        <p className="m-0 text-customBlackText text-base font-medium dark:text-customDarkModeTextColor">
                            Choose Network
                        </p>
                        <img
                            src={
                                networksExpanded ? upCircleIcon : downCircleIcon
                            }
                            onClick={toggleNetworks}
                            alt=""
                        />
                    </div>
                    {networksExpanded && (
                        <div className="flex m-4 justify-around">
                            <div className="w-1/2 px-6">
                                <NetworkBadge
                                    network="Ethereum"
                                    icon={ethereumLogo}
                                    selected={ethereumSelected}
                                    callback={() =>
                                        showAvailableWallets('ethereum')
                                    }
                                />
                            </div>
                            <div className="w-1/2 px-6">
                                <NetworkBadge
                                    network="Tezos"
                                    icon={tezosLogo}
                                    selected={tezosSelected}
                                    callback={() =>
                                        showAvailableWallets('tezos')
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex py-4 px-5 justify-between">
                        <p className="m-0 text-customBlackText text-base font-medium dark:text-customDarkModeTextColor">
                            Select Wallet
                        </p>
                        <img
                            src={
                                ethereumWalletsExpanded
                                    ? upCircleIcon
                                    : downCircleIcon
                            }
                            onClick={toggleWallets}
                            alt=""
                        />
                    </div>
                    {ethereumWalletsExpanded && (
                        <div className="flex mb-16 m-4 justify-around">
                            <WalletBadge
                                walletName="Metamask"
                                icon={metamaskLogo}
                                selected={metaMaskSelected}
                                callback={() => connectWallet('metamask')}
                            />
                            <WalletBadge
                                walletName="Trust Wallet"
                                icon={trustWalletLogo}
                                selected={trustWalletSelected}
                                callback={() => connectWallet('trust')}
                            />
                        </div>
                    )}
                    {tezosWalletsExpanded && (
                        <div className="flex mb-16 m-4 justify-around">
                            <WalletBadge
                                walletName="Trust Wallet"
                                icon={trustWalletLogo}
                                selected={trustWalletSelected}
                                callback={() => {}}
                            />
                            <WalletBadge
                                walletName="Temple"
                                icon={templeLogo}
                                callback={() => {}}
                            />
                        </div>
                    )}
                </>
            )}
            {connectionState === 'connected' && (
                <div className="flex flex-col gap-4 py-5 px-7">
                    <div className="border-solid border border-gray-200 rounded-lg">
                        <div className="flex align-middle justify-start items-center my-2 mx-1 p-2 gap-4">
                            <div className="w-8 h-8 object-contain">
                                <img
                                    className="w-full h-full"
                                    src={accountIconPlaceholder}
                                    alt=""
                                />
                            </div>
                            {account && (
                                <p className="dark:text-customDarkModeTextColor">
                                    {truncateText(account, 8, 8)}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-between my-2 mx-1 p-2 mr-4 gap-4">
                            <div
                                className="flex align-middle justify-start items-center gap-2"
                                onClick={copyAccountToClipboard}
                            >
                                <img src={copyIcon} alt="" />
                                <p className="text-xs text-customGrayAccountDetails font-normal dark:text-customDarkModeTextColor">
                                    Copy Address
                                </p>
                            </div>
                            <div
                                className="flex align-middle justify-start items-center gap-2"
                                onClick={viewOnExplorer}
                            >
                                <img src={documentIcon} alt="" />
                                <p className="text-xs text-customGrayAccountDetails font-normal dark:text-customDarkModeTextColor">
                                    View on explorer
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex align-middle items-center">
                            <p className="text-xs dark:text-customDarkModeTextColor">
                                Connected with{' '}
                                {window.localStorage.getItem('walletProvider')}
                            </p>
                        </div>
                        <button
                            className="border border-red-300 rounded-xl py-4 px-6 bg-red-100 active:bg-red-200"
                            onClick={handleDisconnect}
                        >
                            <p className="text-base font-normal">Disconnect</p>
                        </button>
                    </div>
                </div>
            )}
            {connectionState === 'error' && (
                <div className="flex flex-col gap-4 py-5 px-7">
                    <div className="flex justify-center mt-4 mb-0">
                        <img src={dangerIcon} alt="" />
                    </div>
                    <div>
                        <p className="text-lg font-normal dark:text-customDarkModeTextColor">
                            An Unwanted Error Occurred
                        </p>
                    </div>
                    <div className="flex flex-col mb-4 dark:text-customDarkModeTextColor">
                        <p>Wallet not connected.</p>
                        <p>Please try again</p>
                    </div>
                    <div className="flex mb-2 align-middle justify-center">
                        <PrimaryButton
                            title="Re-Connect"
                            className="w-3/5"
                            callback={handleReconnect}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectOverlay;
