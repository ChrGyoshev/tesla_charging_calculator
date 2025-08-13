import { useState } from "react";
import { ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function InfoModal({ showInfo, onClose }) {
  return (
    <>
      <Modal show={showInfo} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>How it works:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="result">
            <p>
              The information presented here is intended to give a general idea
              of battery capacities and performance. Please note that the data
              used is sourced from various internet resources and may not be
              100% accurate or up-to-date.
            </p>
            <p>
              Calculations and estimates assume a typical system efficiency of
              approximately <strong>90%</strong>, which can vary depending on
              your specific inverter, wiring, and environmental conditions.
            </p>

            <p>
              If you're using a vehicle other than a Tesla, or if your battery
              has noticeable degradation, you can select the{" "}
              <strong>"Custom battery option"</strong> to enter your own values
              and get more accurate estimates.
            </p>
            <p>
              For precise planning or critical applications, always consult the
              manufacturer's specifications or a certified electrician.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
