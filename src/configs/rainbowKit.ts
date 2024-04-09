import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

const PROJECT_ID = '10bc66667bce58aa9b1b9284ac74e731';

export const rainbowConfig = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: PROJECT_ID,
    chains: [mainnet, polygon, optimism, arbitrum, base],
    transports: {
        [mainnet.id]: http(),
    },
});
