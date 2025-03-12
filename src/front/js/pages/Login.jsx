import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const { actions } = useContext(Context);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleLogin  = () => {    
        event.preventDefault();    
        const userLogin = {
            email,
            password
        };
        actions.login(userLogin);
        navigate('/')
    };

    return (
        <div className="container pt-5">
            <form className="form w-25 mx-auto" onSubmit={handleLogin}>
                <p className="form-title">Sign in to your account</p>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                     value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary rounded-4">Login</button>
            </form>
        </div>
    )
}