import React, { useState } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

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

            console.log(BRIDGE_URL);

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

    // Toggle Wallets
    const showAvailableWallets = () => {
        setWalletsExpanded(true);
    };

    return (
        <div className={`connect-overlay ${slideAnimation}`}>
            <div className="connect-overlay-header">
                {connecting ? <p>Connecting</p> : <p>Connect Wallet</p>}
                <div onClick={close} className="connect-overlay-close">
                    <img src={crossIcon} alt="" />
                </div>
            </div>
            <hr className="horizontal-line" />
            {connecting ? (
                <>
                    <div>
                        <p>Connecting...</p>
                    </div>
                    <div>
                        <p>Connecting Wallet</p>
                    </div>
                    <div>
                        <p>Please connect MetaMask & approve transaction</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="choose-network-header">
                        <p>Choose Network</p>
                        <img
                            src={
                                networksExpanded ? upCircleIcon : downCircleIcon
                            }
                            onClick={toggleNetworks}
                            alt=""
                        />
                    </div>
                    {networksExpanded && (
                        <div className="available-networks">
                            <NetworkBadge
                                network="Ethereum"
                                icon={ethereumLogo}
                                callback={showAvailableWallets}
                            />
                            <NetworkBadge
                                network="Polygon"
                                icon={polygonLogo}
                                callback={showAvailableWallets}
                            />
                            <NetworkBadge
                                network="Avalanche"
                                icon={avalancheLogo}
                                callback={showAvailableWallets}
                            />
                        </div>
                    )}
                    <div className="select-wallet-header">
                        <p>Select Wallet</p>
                        <img
                            src={
                                walletsExpanded ? upCircleIcon : downCircleIcon
                            }
                            onClick={toggleWallets}
                            alt=""
                        />
                    </div>
                    {walletsExpanded && (
                        <div className="available-wallets">
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
