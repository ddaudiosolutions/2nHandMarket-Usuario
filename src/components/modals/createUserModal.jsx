import React from 'react'
import { Button, Modal } from 'react-bootstrap';

function createUserModal({show, handleClose}) {
    return (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName='modal-90w'
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton className="bg-info">
              <Modal.Title className='ms-auto'> Usuario Registrado </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <h5> Bien Venido, puedes </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>              
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default createUserModal