import React, { useState } from 'react';

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
import WebApp from '@twa-dev/sdk';

type Props = {
    slideAnimation: string;
    close: () => void;
};

const ConnectOverlay: React.FC<Props> = ({ close, slideAnimation }) => {
    const [networksExpanded, setNetworksExpanded] = useState(true);
    const [walletsExpanded, setWalletsExpanded] = useState(false);

    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };

    const toggleWallets = () => {
        setWalletsExpanded(!walletsExpanded);
    };

    // connect function

    const connectMetamask = () => {
        console.log('Connecting Metamask');
        WebApp.openLink(
            'https://metamask.app.link/dapp/softstackhq.github.io/telegram-mini-app/'
        );
    };

    // Toggle Wallets
    const showAvailableWallets = () => {
        setWalletsExpanded(true);
    };

    return (
        <div className={`connect-overlay ${slideAnimation}`}>
            <div className="connect-overlay-header">
                <p>Connect Account</p>
                <div onClick={close} className="connect-overlay-close">
                    <img src={crossIcon} alt="" />
                </div>
            </div>
            <hr className="horizontal-line" />

            <div className="choose-network-header">
                <p>Choose Network</p>
                <img
                    src={networksExpanded ? upCircleIcon : downCircleIcon}
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
                    src={walletsExpanded ? upCircleIcon : downCircleIcon}
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
        </div>
    );
};

export default ConnectOverlay;
