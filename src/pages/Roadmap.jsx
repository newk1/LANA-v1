import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MAINNET_RPC = 'https://api.mainnet-beta.solana.com';
const DEVNET_RPC = 'https://api.devnet.solana.com';

const Roadmap = () => {
    const { publicKey, connected } = useWallet();
    const [solBalance, setSolBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [accountInfo, setAccountInfo] = useState(null);
    const [network, setNetwork] = useState('mainnet'); // Default network: Mainnet
    const [connection, setConnection] = useState(new Connection(MAINNET_RPC, 'confirmed'));

    // Update the connection whenever the network changes
    useEffect(() => {
        const rpc = network === 'mainnet' ? MAINNET_RPC : DEVNET_RPC;
        const newConnection = new Connection(rpc, 'confirmed');
        setConnection(newConnection);

        // Immediately fetch new data when the network changes
        if (connected && publicKey) {
            fetchSolanaData(newConnection);
        }
    }, [network, connected, publicKey]);

    // Fetch wallet data (balance, transactions, and account info)
    const fetchSolanaData = async (connection) => {
        try {
            if (publicKey) {
                // Fetch SOL Balance
                const balance = await connection.getBalance(publicKey);
                setSolBalance(balance / 1e9); // Convert lamports to SOL

                // Fetch Account Info
                const info = await connection.getAccountInfo(publicKey);
                setAccountInfo(info);

                // Fetch Recent Transactions
                const transactionHistory = await connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 5 });
                setTransactions(transactionHistory);
            }
        } catch (error) {
            console.error('Error fetching Solana data:', error);
        }
    };

    // Fetch data on component mount and when the wallet is connected
    useEffect(() => {
        if (connected && publicKey) {
            fetchSolanaData(connection);
        }
    }, [connected, publicKey, connection]);

    return (
        <div className="container mt-4">
            <h1 className="text-light">Wallet Details</h1>

            {/* Network Toggle */}
            <div className="mb-4">
                <h5 className="text-light">Network:</h5>
                <ButtonGroup>
                    <ToggleButton
                        id="toggle-mainnet"
                        type="radio"
                        variant={network === 'mainnet' ? 'primary' : 'outline-primary'}
                        name="network"
                        value="mainnet"
                        checked={network === 'mainnet'}
                        onChange={() => setNetwork('mainnet')}
                    >
                        Mainnet
                    </ToggleButton>
                    <ToggleButton
                        id="toggle-devnet"
                        type="radio"
                        variant={network === 'devnet' ? 'primary' : 'outline-secondary'}
                        name="network"
                        value="devnet"
                        checked={network === 'devnet'}
                        onChange={() => setNetwork('devnet')}
                    >
                        Devnet
                    </ToggleButton>
                </ButtonGroup>
            </div>

            {!connected ? (
                <p className="text-warning">Please connect your wallet to view details.</p>
            ) : (
                <div className="text-light">
                    {/* Wallet Address */}
                    <h5>Wallet Address:</h5>
                    <p>{publicKey?.toString()}</p>

                    {/* SOL Balance */}
                    <h5>Solana Balance ({network.toUpperCase()}):</h5>
                    <p>{solBalance.toFixed(4)} SOL</p>

                    {/* Account Info */}
                    {accountInfo && (
                        <>
                            <h5>Account Info:</h5>
                            <ul>
                                <li>Executable: {accountInfo.executable ? 'Yes' : 'No'}</li>
                                <li>Owner: {accountInfo.owner?.toString()}</li>
                                <li>Lamports: {accountInfo.lamports}</li>
                            </ul>
                        </>
                    )}

                    {/* Recent Transactions */}
                    <h5>Recent Transactions ({network.toUpperCase()}):</h5>
                    {transactions.length > 0 ? (
                        <ul>
                            {transactions.map((tx, index) => (
                                <li key={index}>
                                    Signature: {tx.signature} (Slot: {tx.slot})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No transactions found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Roadmap;
