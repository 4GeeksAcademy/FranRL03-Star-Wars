import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditContact = () => {

    const { store, actions } = useContext(Context);
    const contact = store.currentContact;
    const [ name, setName ] = useState(contact.name);
    const [ email, setEmail ] = useState(contact.email);
    const [ address, setAddress ] = useState(contact.address);
    const [ phone, setPhone ] = useState(contact.phone);
    const navigate = useNavigate();
    

    const handleEdit  = () => {        
        const updatedContact = {
            id: contact.id,
            name,
            email,
            address,
            phone
        };

        actions.editContact(updatedContact);
        navigate('/contact')
    };

    return (
        <div className="container">
            <h1 className="text-center">Edit Students</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                    value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" 
                    value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">address</label>
                    <input type="text" className="form-control" id="inputPassword1"
                    value={address} onChange={(event) => setAddress(event.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword2" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPassword2"
                    value={phone} onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <button type="submit" onClick={handleEdit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}