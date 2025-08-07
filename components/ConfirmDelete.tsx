'use client';

import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';

const ConfirmDelete = ({ showModal, hideModal, ids, deletefinal }) => {
    const [loading, setLoading] = useState(false);
    const handleDeleteSelected = async () => {
        setLoading(true);
        try {
            await deletefinal(ids);
            toast.success('Odabrane narudžbe uspješno izbrisane!');
            hideModal();
        } catch (error) {
            console.error('Delete failed:', error);
            toast.error('Došlo je do greške prilikom brisanja narudžbi!');
        } finally {
            setLoading(false);
        }
    } 
    return (
        <Modal show={showModal} onHide={hideModal}>
            <div style={{ position: 'relative' }}>
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-container">
                            <CircularProgress 
                                size={60}
                                thickness={4}
                                sx={{
                                    color: '#16a34a',
                                    '& .MuiCircularProgress-circle': {
                                        strokeLinecap: 'round',
                                    },
                                }}
                            />
                            <p className="loading-text">Brisanje narudžbi...</p>
                        </div>
                    </div>
                )}
                <Modal.Header closeButton>
                    <Modal.Title>Potvrda brisanja</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className="alert alert-danger">Jeste li sigurni da želite obrisati odabrane narudžbe?</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteSelected() }>
                        Delete
                    </Button>
                </Modal.Footer>
            </div>
            <style jsx>{`
                .loading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 9999;
                    background-color: rgba(255, 255, 255, 0.9);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.375rem;
                }

                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    padding: 2rem;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    border: 2px solid #16a34a;
                    animation: loadingFadeIn 0.3s ease-out;
                }

                .loading-text {
                    color: #16a34a;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin: 0;
                    text-align: center;
                    animation: textPulse 1.5s ease-in-out infinite;
                }

                @keyframes loadingFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes textPulse {
                    0%, 100% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 1;
                    }
                }
            `}</style>
        </Modal>
    )
}

export default ConfirmDelete;