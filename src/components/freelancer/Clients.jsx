import { Modal } from "react-bootstrap";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import * as React from "react";
import REQUEST from "@/utils/networks/Request";
const Clients = (props) => {
    const { data } = props;
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('We\'ll never share email with anyone else.');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const validateEmail = (email) => {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    }
    const addClient = async () => {
        if(email !== '' && validateEmail(email)){
            const response = await REQUEST.PageData.addClient(email);
            if(response.success){
                data.unshift({customerEmail: email, totalOrder: 0});
                handleClose();
            } else {
                setError(true);
                setErrorMessage(response.message);
            }
        } else {
            setError(true);
            setErrorMessage('Your provided email is not valid.');
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <Button variant="btn btn-primary" onClick={handleShow}>
                        Add Client
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Client</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                    {error ? <div id="emailHelp" className="form-text text-danger">{errorMessage}
                                    </div>:<div id="emailHelp" className="form-text">{errorMessage}</div>}

                                </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>{setEmail(''); setError(false)}}>
                                Reset
                            </Button>
                            <Button variant="primary" onClick={addClient}>
                                Add Client
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="row mb-3 mt-3 mt-md-0">
                <div className="table-responsive">
                    <table className="table table-bordered ">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total Order</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.length
                            ? data.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.customerEmail}</td>
                                    <td>{item.totalOrder}</td>
                                </tr>
                            ))
                            : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default Clients;
