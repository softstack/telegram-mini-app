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
import polygonLogo from '../../assets/polygon_logo.svg';
import avalancheLogo from '../../assets/avalanche_logo.svg';
import metamaskLogo from '../../assets/metamask_logo.svg';
import coinbaseLogo from '../../assets/coinbase_logo.svg';

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
    const [walletsExpanded, setWalletsExpanded] = useState(false);

    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };

    const toggleWallets = () => {
        setWalletsExpanded(!walletsExpanded);
    };

    const [connecting, setConnecting] = useState<boolean>(false);

    // connect function
    const connectMetamask = async () => {
        try {
            setConnecting(true);

            window.localStorage.removeItem('walletconnect');
            window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');

            const response = await axios.post(BRIDGE_URL + '/init-provider');
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
                        setConnecting(false);
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
        }
    };

    // Network Selection
    const [ethereumSelected, setEthereumSelected] = useState(false);
    const [polygonSelected, setPolygonSelected] = useState(false);
    const [avalancheSelected, setAvalancheSelected] = useState(false);

    // Toggle Wallets
    const showAvailableWallets = (network: string) => {
        if (network === 'ethereum') {
            setEthereumSelected(true);
            setPolygonSelected(false);
            setAvalancheSelected(false);
        }
        if (network === 'polygon') {
            setEthereumSelected(false);
            setPolygonSelected(true);
            setAvalancheSelected(false);
        }
        if (network === 'avalanche') {
            setEthereumSelected(false);
            setPolygonSelected(false);
            setAvalancheSelected(true);
        }

        setWalletsExpanded(true);
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
                    <div>
                        <PulseLoader size={12} margin={5} />
                    </div>
                    <div>
                        <p style={{ color: 'black' }}>Connecting Wallet</p>
                    </div>
                    <div>
                        <p style={{ color: 'black' }}>
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
                                network="Polygon"
                                icon={polygonLogo}
                                selected={polygonSelected}
                                callback={() => showAvailableWallets('polygon')}
                            />
                            <NetworkBadge
                                network="Avalanche"
                                icon={avalancheLogo}
                                selected={avalancheSelected}
                                callback={() =>
                                    showAvailableWallets('avalanche')
                                }
                            />
                        </div>
                    )}
                    <div className="flex py-4 px-5 justify-between">
                        <p className="m-0 text-customBlackText text-base font-medium">
                            Select Wallet
                        </p>
                        <img
                            src={
                                walletsExpanded ? upCircleIcon : downCircleIcon
                            }
                            onClick={toggleWallets}
                            alt=""
                        />
                    </div>
                    {walletsExpanded && (
                        <div className="flex m-4 justify-around">
                            <WalletBadge
                                walletName="Metamask"
                                icon={metamaskLogo}
                                callback={connectMetamask}
                            />
                            <WalletBadge
                                walletName="Coinbase"
                                icon={coinbaseLogo}
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
