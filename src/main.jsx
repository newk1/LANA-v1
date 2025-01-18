import 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import WalletContextProvider from './contexts/WalletContextProvider'; // Ensure this is properly imported
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/theme.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <WalletContextProvider>
            <Router>
                <App />
            </Router>
        </WalletContextProvider>,
);
