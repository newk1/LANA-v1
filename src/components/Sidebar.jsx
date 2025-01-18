import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { NavLink } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";
import "../styles/theme.css"; // Uses the futuristic theme styles
import "../styles/sidebar.css";


const Sidebar = () => {
    const { connected, publicKey, disconnect } = useWallet();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            {/* Sidebar Toggle Button for Mobile */}
            <Button
                variant="primary"
                className="d-lg-none futuristic-card shadow-blue m-2"
                onClick={handleShow}
            >
                Menu
            </Button>

            {/* Offcanvas Sidebar for Mobile */}
            <Offcanvas show={showSidebar} onHide={handleClose} className="bg-dark text-light">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-glow">LANA</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/protocol-metrics"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Protocol Metrics
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/swap"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Swap
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/money-printer"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Money Printer
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/lambo-together"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Lambo Together
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/roadmap"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Roadmap
                            </NavLink>
                        </li>
                        <li className="nav-item mb-3">
                            <NavLink
                                to="/docs"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active nav-glow" : "nav-link text-light"
                                }
                                onClick={handleClose}
                            >
                                Docs
                            </NavLink>
                        </li>
                    </ul>
                    <Button
                        onClick={disconnect}
                        className="btn-disconnect futuristic-card shadow-blue w-100 mt-4"
                        variant="danger"
                    >
                        Disconnect
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Sidebar for Desktop */}
            <div className="sidebar futuristic-card shadow-blue p-3 d-none d-lg-block">
                <h2 className="text-glow mb-4">LANA</h2>
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/protocol-metrics"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Protocol Metrics
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/swap"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Swap
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/money-printer"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Money Printer
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/lambo-together"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Lambo Together
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/roadmap"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Roadmap
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/docs"
                            className={({ isActive }) =>
                                isActive ? "nav-link active nav-glow" : "nav-link text-light"
                            }
                        >
                            Docs
                        </NavLink>
                    </li>
                </ul>
                <Button
                    onClick={disconnect}
                    className="btn-disconnect  shadow-blue w-100 mt-auto"
                    variant="danger"
                >
                    Disconnect
                </Button>
            </div>
        </>
    );
};

export default Sidebar;
