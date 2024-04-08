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

type Props = {
    close: () => void;
};

const ConnectOverlay: React.FC<Props> = ({ close }) => {
    const [networksExpanded, setNetworksExpanded] = useState(true);
    const [walletsExpanded, setWalletsExpanded] = useState(false);

    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };

    const toggleWallets = () => {
        setWalletsExpanded(!walletsExpanded);
    };

    return (
        <div className="connect-overlay">
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
                    <NetworkBadge network="Ethereum" icon={ethereumLogo} />
                    <NetworkBadge network="Polygon" icon={polygonLogo} />
                    <NetworkBadge network="Avalanche" icon={avalancheLogo} />
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
                    <WalletBadge walletName="Metamask" icon={metamaskLogo} />
                    <WalletBadge walletName="Coinbase" icon={coinbaseLogo} />
                </div>
            )}
        </div>
    );
};

export default ConnectOverlay;
