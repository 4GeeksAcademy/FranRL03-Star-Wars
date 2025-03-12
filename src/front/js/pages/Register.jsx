import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Register = () => {

    const { actions } = useContext(Context)

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")

    const naviagte = useNavigate()

    const handleRegister = () => {
        event.preventDefault()
        const userRegister = {
            email,
            password,
            first_name: firstName,
            last_name: lastName
        }

        actions.register(userRegister)
        console.log("formulario del registro", userRegister)
        naviagte("/")
    }

    return (
        <div className="container pt-5">
            <form className="form w-25 mx-auto" onSubmit={handleRegister}>
                <p className="form-title">Create your account</p>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                    <input type="password" className="form-control" id="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" 
                    value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary rounded-4">Register</button>
            </form>
        </div>
    )
}