import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Contact = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState({});
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleEdit = (contact) => {
        actions.setCurrentContact(contact);
        navigate('/edit-contact')
    }

    const handleDelete = (contact) => {
        actions.deleteContact(contact)
    }

    const openModal = (contact) => {
        setSelectedContact(contact)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="container">

            <h1 className="text-center mt-5">CONTACT LIST</h1>

            <ul className="list-group list-group-flush mt-5">
                {
                    store.contactList.length == 0 ?

                        <h1 className="text-secondary mt-5">There are no contacts</h1>

                        :

                        store.contactList.contacts.map((iterator) => (
                            <li key={iterator.id} className="list-group-item d-flex contact-item" style={{ width: "600px" }}>

                                <div className="card mb-3 contact-card" style={{ width: "540px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src="https://www.w3schools.com/howto/img_avatar.png" className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{iterator.name}</h5>
                                                <p className="card-text"><small className="text-body-secondary"><strong>Phone: </strong> {iterator.phone}</small></p>
                                                <p className="card-text"><small className="text-body-secondary"><strong>Email: </strong> {iterator.email}</small></p>
                                                <p className="card-text"><small className="text-body-secondary"><strong>Adress: </strong> {iterator.address}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-column align-items-center contact-buttons">
                                    <Button variant="danger" onClick={() => { openModal(iterator) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </Button>

                                    <button type="button" onClick={() => handleEdit(iterator)} className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg></button>

                                </div>

                            </li>
                        ))
                }
            </ul>

            {/* MODAL */}

            <Modal
                show={isModalOpen}
                onHide={closeModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Contact Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Are you sure you want to delete the <strong>"{selectedContact.name}"</strong> contact?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button onClick={() => { handleDelete(selectedContact) }} variant="danger">Delete</Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}