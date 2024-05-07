// import React, { ReactNode } from 'react';

// import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import {
//     ConnectionProvider,
//     WalletProvider,
// } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import {
//     PhantomWalletAdapter,
//     SolflareWalletAdapter,
//     TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';

// const SolanaContext: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const network = WalletAdapterNetwork.Mainnet;
//     const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

//     const wallets = React.useMemo(
//         () => [
//             new PhantomWalletAdapter(),
//             new SolflareWalletAdapter(),
//             new TorusWalletAdapter(),
//         ],
//         [network]
//     );
//     return (
//         <ConnectionProvider endpoint={endpoint}>
//             <WalletProvider wallets={wallets} autoConnect>
//                 <WalletModalProvider>{children}</WalletModalProvider>
//             </WalletProvider>
//         </ConnectionProvider>
//     );
// };

// export default SolanaContext;
