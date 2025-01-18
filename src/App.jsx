import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import ProtocolMetrics from './pages/ProtocolMetrics';
import Swap from './pages/Swap';
import MoneyPrinter from './pages/MoneyPrinter';
import LamboTogether from './pages/LamboTogether';
import Roadmap from './pages/Roadmap';
import Docs from './pages/Docs';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';

const App = () => {
    const { connected } = useWallet();
    const navigate = useNavigate();

    // Redirect logic
    useEffect(() => {
        if (!connected) {
            navigate('/'); // Redirect to LandingPage if disconnected
        }
        // else {
        //     navigate('/protocol-metrics'); // Redirect to ProtocolMetrics after connection
        // }
    }, [connected, navigate]);

    return (
        <div className="d-flex flex-column flex-lg-row">
            {/* Sidebar (hidden on smaller screens) */}
            {connected && <Sidebar />}

            {/* Main Content Area */}
            <div className="flex-grow-1">
                <Routes>
                    {!connected ? (
                        <>
                            {/* Render Landing Page only when not connected */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            {/* Connected Routes */}
                            <Route path="/protocol-metrics" element={<ProtocolMetrics />} />
                            <Route path="/swap" element={<Swap />} />
                            <Route path="/money-printer" element={<MoneyPrinter />} />
                            <Route path="/lambo-together" element={<LamboTogether />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/docs" element={<Docs />} />
                            {/* Fallback for unknown routes */}
                            <Route path="*" element={<Navigate to="/protocol-metrics" />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
};

export default App;
