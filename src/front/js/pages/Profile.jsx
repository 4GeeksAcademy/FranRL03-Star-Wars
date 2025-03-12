import React from "react";

export const Profile = () => {

    const user = JSON.parse(localStorage.getItem("user")); 

    return( 
        <h1>{user.email}</h1>
    )
}