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

import './ConnectOverlay.css';

type Props = {
    slideAnimation: string;
    close: () => void;
    onConnect: () => void;
};

const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || '';

const ConnectOverlay: React.FC<Props> = ({
    slideAnimation,
    close,
    onConnect,
}) => {
    const [networksExpanded, setNetworksExpanded] = useState(true);
    const [ethereumWalletsExpanded, setEthereumWalletsExpanded] =
        useState(false);
    const [tezosWalletsExpanded, setTezosWalletsExpanded] = useState(false);

    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };

    // const toggleWallets = () => {
    //     setEthereumWalletsExpanded(!ethereumWalletsExpanded);
    // };

    const [connecting, setConnecting] = useState<boolean>(false);

    // connect function
    const connectWallet = async (wallet: string) => {
        try {
            setConnecting(true);

            window.localStorage.removeItem('walletconnect');
            window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');

            const response = await axios.post(BRIDGE_URL + '/init-provider', {
                wallet: wallet,
            });
            const providerId = response.data.providerId;

            window.localStorage.setItem('providerId', providerId);

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
                        onConnect();
                        localStorage.setItem('wallet', wallet);
                        setConnecting(false);
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

    return (
        <div className={`connect-overlay ${slideAnimation}`}>
            <div className="flex justify-between text-left py-3 px-4">
                {connecting ? (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Connecting
                    </p>
                ) : (
                    <p className="m-0 text-lg font-bold text-customBlackText">
                        Connect Wallet
                    </p>
                )}
                <div
                    onClick={close}
                    className="flex items-center cursor-pointer"
                >
                    <img src={crossIcon} alt="" />
                </div>
            </div>
            <hr className="m-0 border-t-1 border-solid border-customGrayLine" />
            {connecting ? (
                <>
                    <div className="my-10">
                        <PulseLoader size={12} margin={5} color="#2D2D2D" />
                    </div>
                    <div>
                        <p className="text-lg m-4 mt-2">Connecting Wallet</p>
                    </div>
                    <div>
                        <p className="m-4 mb-8 px-10">
                            Please connect MetaMask & approve transaction
                        </p>
                    </div>
                </>
            ) : (
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
                                callback={() => connectWallet('metamask')}
                            />
                            <WalletBadge
                                walletName="Trust Wallet"
                                icon={trustWalletLogo}
                                callback={() => connectWallet('trust')}
                            />
                        </div>
                    )}
                    {tezosWalletsExpanded && (
                        <div className="flex mb-16 m-4 justify-around">
                            <WalletBadge
                                walletName="Trust Wallet"
                                icon={trustWalletLogo}
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
        </div>
    );
};

export default ConnectOverlay;
