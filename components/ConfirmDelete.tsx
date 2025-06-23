import React from 'react'
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
const ConfirmDelete = ({ showModal, hideModal, ids, deletefinal }) => {
    
    const handleDeleteSelected = () => {
          deletefinal(ids);
    } 
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
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
      </Modal>
    )
}

export default ConfirmDelete;