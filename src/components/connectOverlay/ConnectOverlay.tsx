import React, { useState } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { PulseLoader } from 'react-spinners';

import NetworkBadge from './NetworkBadge';
import WalletBadge from './WalletBadge';

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
    const connectionState = useSelector(
        (state: RootState) => state.connection.connectionState
    );
    const dispatch = useDispatch<AppDispatch>();

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
        dispatch(setConnectionState('disconnected'));
        close();
    };

    // connect function
    const connectWallet = async (wallet: string) => {
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
            close();

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
                        dispatch(setConnectionState('connected'));
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
        } catch (error) {
            console.error('Error during initial connection:', error);
            dispatch(setConnectionState('error'));
        }
    };

    // Network Selection
    const [ethereumSelected, setEthereumSelected] = useState(false);
    const [tezosSelected, setTezosSelected] = useState(false);

    // Toggle Wallets
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
    const handelDisconnect = () => {
        window.localStorage.removeItem('providerId');
        window.localStorage.removeItem('walletConnectURI');
        window.localStorage.removeItem('walletProvider');
        window.localStorage.removeItem('walletconnect');
        window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
        dispatch(setConnectionState('disconnected'));
    };

    return (
        <div className={`connect-overlay ${slideAnimation}`}>
            <div className="flex justify-between text-left py-3 px-4">
                {connectionState === 'connecting' && (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Connecting
                    </p>
                )}
                {connectionState === 'disconnected' && (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Connect Wallet
                    </p>
                )}
                {connectionState === 'connected' && (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Account Details
                    </p>
                )}
                {connectionState === 'error' && (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Connection Error
                    </p>
                )}
                {connectionState === 'retrying' && (
                    <p className="m-0 text-lg font-bold text-customBlackText">
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
                        <PulseLoader size={12} margin={5} color="#2D2D2D" />
                    </div>
                    <div>
                        <p className="text-lg m-4 mt-2">Connecting Wallet</p>
                    </div>
                    <div>
                        <p className="m-4 mb-8 px-10">
                            Please connect your Wallet & approve transaction
                        </p>
                    </div>
                </>
            )}
            {connectionState === 'disconnected' && (
                <>
                    <div className="flex py-4 px-5 justify-between">
                        <p className="m-0 text-customBlackText text-base font-medium">
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
                            <NetworkBadge
                                network="Ethereum"
                                icon={ethereumLogo}
                                selected={ethereumSelected}
                                callback={() =>
                                    showAvailableWallets('ethereum')
                                }
                            />
                            <NetworkBadge
                                network="Tezos"
                                icon={tezosLogo}
                                selected={tezosSelected}
                                callback={() => showAvailableWallets('tezos')}
                            />
                        </div>
                    )}
                    <div className="flex py-4 px-5 justify-between">
                        <p className="m-0 text-customBlackText text-base font-medium">
                            Select Wallet
                        </p>
                        {/* <img
                            src={
                                ethereumWalletsExpanded
                                    ? upCircleIcon
                                    : downCircleIcon
                            }
                            onClick={toggleWallets}
                            alt=""
                        /> */}
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
                                callback={() => connectWallet('trust')}
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
                            {account && <p>{truncateText(account, 8, 8)}</p>}
                        </div>
                        <div className="flex justify-between my-2 mx-1 p-2 mr-4 gap-4">
                            <div
                                className="flex align-middle justify-start items-center gap-2"
                                onClick={copyAccountToClipboard}
                            >
                                <img src={copyIcon} alt="" />
                                <p className="text-xs text-customGrayAccountDetails font-normal">
                                    Copy Address
                                </p>
                            </div>
                            <div
                                className="flex align-middle justify-start items-center gap-2"
                                onClick={viewOnExplorer}
                            >
                                <img src={documentIcon} alt="" />
                                <p className="text-xs text-customGrayAccountDetails font-normal">
                                    View on explorer
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex align-middle items-center">
                            <p className="text-xs">
                                Connected with{' '}
                                {window.localStorage.getItem('walletProvider')}
                            </p>
                        </div>
                        <div
                            className="border border-red-300 rounded-xl py-4 px-6 bg-red-100"
                            onClick={handelDisconnect}
                        >
                            <p className="text-base font-normal">Disconnect</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectOverlay;
