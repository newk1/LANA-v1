import { useState, useEffect } from 'react';
import { Button, Form, Alert, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram } from '@solana/web3.js';
import axios from 'axios';

// Constants
const MAINNET_RPC = 'https://api.mainnet-beta.solana.com'; // Mainnet RPC endpoint
const DEVNET_RPC = 'https://api.devnet.solana.com'; // Devnet RPC endpoint
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd';

const Swap = () => {
    const { publicKey, sendTransaction, connected } = useWallet();
    const [amountSol, setAmountSol] = useState(0);
    const [solBalance, setSolBalance] = useState(0);
    const [solPrice, setSolPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [network, setNetwork] = useState('mainnet'); // Current network state (mainnet/devnet)

    // Update connection based on network
    const connection = new Connection(network === 'mainnet' ? MAINNET_RPC : DEVNET_RPC, 'confirmed');

    // Fetch SOL balance from the wallet
    const getSolanaBalance = async (walletPublicKey) => {
        const balance = await connection.getBalance(walletPublicKey);
        return balance / 1e9; // Convert lamports to SOL
    };

    // Fetch Solana price in USD
    const fetchSolanaPrice = async () => {
        try {
            const response = await axios.get(COINGECKO_API_URL);
            return response.data.solana.usd;
        } catch (error) {
            console.error('Error fetching Solana price:', error);
            return 0; // Fallback value
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (connected && publicKey) {
                try {
                    const balance = await getSolanaBalance(publicKey);
                    const price = await fetchSolanaPrice();
                    setSolBalance(balance);
                    setSolPrice(price);
                } catch (error) {
                    console.error('Error fetching balance or price:', error);
                }
            }
        };

        fetchData();
    }, [connected, publicKey, network]); // Re-fetch balance when the network changes

    // Handle swap logic
    const handleSwap = async () => {
        if (!amountSol || amountSol <= 0) {
            setError('Amount of SOL to swap must be greater than 0');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const transaction = new Transaction();
            const solAmount = amountSol * 1e9; // Convert to lamports
            const transferInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: publicKey, // Replace with LANA liquidity pool address
                lamports: solAmount,
            });

            transaction.add(transferInstruction);

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature);

            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Swap failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Swap SOL to LANA</h1>

            {/* Network Toggle */}
            <div className="mb-4">
                <h5>Network:</h5>
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

            {/* Display SOL Balance and USD Value */}
            <div className="mb-4 p-3 bg-dark text-white rounded">
                <h4>Your Wallet ({network.toUpperCase()})</h4>
                <p>
                    <strong>Solana Balance:</strong> {solBalance.toFixed(2)} SOL
                </p>
                <p>
                    <strong>USD Value:</strong> ${solBalance > 0 ? (solBalance * solPrice).toFixed(2) : 'Loading...'}
                </p>
            </div>

            {/* Alert Messages */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Swap Successful! You have received LANA.</Alert>}

            {/* Swap Form */}
            <Form>
                <Form.Group controlId="solAmount">
                    <Form.Label>Amount of SOL</Form.Label>
                    <Form.Control
                        type="number"
                        value={amountSol}
                        onChange={(e) => setAmountSol(parseFloat(e.target.value))}
                        placeholder="Enter amount of SOL"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleSwap}
                    disabled={loading || !connected}
                    className="mt-3"
                >
                    {loading ? 'Processing...' : 'Swap SOL for LANA'}
                </Button>
            </Form>
        </div>
    );
};

export default Swap;
