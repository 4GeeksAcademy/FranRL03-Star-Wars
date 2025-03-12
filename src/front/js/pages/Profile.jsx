import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = () => {

    const { store, actions } = useContext(Context);
    const user = store.user
    const navigate = useNavigate()

    const handleAccess = () => {
        if (store.isLogged) {
            actions.logout();
            navigate('/')
        }
    }

    return (
        user ?

            <div className="container">
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="card shadow-lg rounded-4">
                                <div class="card-header text-center bg-primary text-white">
                                    <h3>My Profile</h3>
                                </div>
                                <div class="card-body text-center">
                                    <h4 id="nombre">Nombre: <span className="text-primary">{user.first_name}</span></h4>
                                    <h4 id="apellido">Apellido: <span className="text-primary">{user.last_name}</span></h4>
                                    <h5 id="email">Email: <span className="text-primary">{user.email}</span></h5>
                                </div>
                                <div class="card-footer text-center">
                                    <button class="btn btn-primary me-2" onClick={() => navigate("/edit-profile")}>Edit profile</button>
                                    <button class="btn btn-danger" onClick={handleAccess}>Log out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            :

            <div className="container text-center mt-5">
                <h3 className="text-danger">No user logged in</h3>
                <button className="btn btn-primary" onClick={() => navigate("/login")}>
                    Go to Login
                </button>
            </div>
    )
}