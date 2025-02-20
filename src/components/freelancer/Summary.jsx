import { Modal } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import * as React from "react";
const Summary = (props) => {
    const { data } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="row mb-3 mt-3 mt-md-0">
                <div className="col-4 mb-3">
                    <div className=" box bg-blue">
                        <p className={'box-title'}>Total Client Added</p>
                        <p className={'box-amount'}>0</p>
                    </div>
                </div>
                <div className="col-4 mb-3">
                    <div className=" box bg-yellow">
                        <p className={'box-title'}>Total Order</p>
                        <p className={'box-amount'}>0</p>
                    </div>
                </div>
                <div className="col-4 mb-3">
                    <div className=" box bg-green">
                        <p className={'box-title'}>Total Earned</p>
                        <p className={'box-amount'}>£ 0</p>
                    </div>
                </div>
                <div className="col-4 mb-3">
                    <div className=" box bg-yellow">
                        <p className={'box-title'}>Total Withdrawn</p>
                        <p className={'box-amount'}>0</p>
                    </div>
                </div>
                <div className="col-4 mb-3">
                    <div className=" box bg-blue">
                        <p className={'box-title'}>Available Balance</p>
                        <p className={'box-amount'}>0</p>
                    </div>
                </div>
                <div className="col-4 mb-3">
                    <div className=" box bg-yellow">
                        <p className={'box-title'}>JSS</p>
                        <p className={'box-amount'}>0</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <Button variant="btn btn-primary" onClick={handleShow}>
                        Withdraw
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Withdraw Balance</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};
export default Summary;
