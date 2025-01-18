// Import necessary libraries and dependencies
import 'react';
import { Container } from 'react-bootstrap';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '../styles/LandingPage.css'; // CSS for futuristic styles

const LandingPage = () => {
    const { connected } = useWallet();

    return (
        <div className="landing-page">
            <Container className="text-center">
                <h1 className="landing-title">Welcome to LANA</h1>
                <p className="landing-subtitle">Your gateway to the future of cryptocurrency</p>
                <WalletMultiButton className="connect-wallet-button" />
                {connected && (
                    <p className="connected-message">Wallet Connected! Proceed to the Dashboard.</p>
                )}
            </Container>
        </div>
    );
};

export default LandingPage;

