import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletContext = createContext();

// eslint-disable-next-line react/prop-types
export const WalletProvider = ({ children }) => {
    const { connected, publicKey, disconnect } = useWallet();
    const [walletState, setWalletState] = useState({ connected, publicKey });

    useEffect(() => {
        setWalletState({ connected, publicKey });
    }, [connected, publicKey]);

    return (
        <WalletContext.Provider value={{ ...walletState, disconnect }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWalletContext = () => useContext(WalletContext);
