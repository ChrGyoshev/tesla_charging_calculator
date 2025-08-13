import { useState } from "react";
import { ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function PriceModal({ showModal, onClose, neededCapacity, cost }) {
  return (
    <>
      <Modal show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Charging Cost</Modal.Title>
        </Modal.Header>

        {cost > 0 ? (
          <Modal.Body>
            <div className="result">
              <h2>Estimated Cost: {cost} BGN</h2>
              {/* <p>
               Charging from {currentCharge}% to {desiredCharge}%
             </p> */}
              <p>Needed Kwh {neededCapacity}</p>
              {/* <p>({timeOfDay} rate)</p> */}
            </div>
          </Modal.Body>
        ) : (
          <ModalBody>
            <div className="result">
              <h2 className="text-danger">Something went wrong!</h2>
              <p className="p-5">
                Please fill all the fields correct and try again!
              </p>
            </div>
          </ModalBody>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
