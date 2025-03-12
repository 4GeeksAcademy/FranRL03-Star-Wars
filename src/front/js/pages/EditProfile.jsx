import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const EditProfile = () => {

    const { store, actions } = useContext(Context);
    const user = store.user

    const [firstName, setFirstName] = useState(user.first_name);
    const [email, setEmail] = useState(user.email);
    const [lastName, setLastName] = useState(user.last_name);
    const navigate = useNavigate();


    const handleEdit = () => {
        const updatedProfile = {
            last_name: lastName,
            first_name: firstName,
            email
        };

        actions.editProfile(updatedProfile);
        navigate('/profile')
    };

    return (
        <div className="container">
            <h1 className="text-center">Edit Profile</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="inputPassword1"
                        value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="text" className="form-control" id="exampleInputPassword1"
                        value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <button type="submit" onClick={handleEdit} className="btn btn-primary">Submit</button>
                <button type="submit" onClick={() => navigate("/profile")} className="btn btn-danger ms-3">Cancel</button>
            </form>
        </div>
    )
}