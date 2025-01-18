import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/theme.css'; // Ensure this aligns with the app's theme

const MoneyPrinter = () => {
    const [amountToStake, setAmountToStake] = useState('');

    const handleStake = () => {
        alert(`Staking ${amountToStake} LANA`);
        // Implement staking logic here
    };

    return (
        <div className="container mt-4">
            <h1 className="text-light mb-4">Money Printer</h1>
            <Card className="bg-dark text-white shadow-sm">
                <Card.Body>
                    <h3 className="card-title">Stake Your LANA</h3>
                    <Form className="mt-3">
                        <Form.Group controlId="stakeAmount">
                            <Form.Label>Amount to Stake</Form.Label>
                            <Form.Control
                                type="number"
                                value={amountToStake}
                                onChange={(e) => setAmountToStake(e.target.value)}
                                placeholder="Enter amount of LANA"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={handleStake}
                            className="mt-3"
                            disabled={!amountToStake || parseFloat(amountToStake) <= 0}
                        >
                            Stake
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MoneyPrinter;
