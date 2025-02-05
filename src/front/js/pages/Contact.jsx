import React, { useEffect, useState } from "react";

export const Contact = () => {

    const [contactList, setContactList] = useState([
        {
            "name": "User",
            "phone": "123456789",
            "email": "user@gmail.com",
            "address": "Helsinki, Finlandia",
            "id": 1
        }
    ])
    const uri = 'https://playground.4geeks.com/contact/agendas'
    const user = 'fran'

    // const getContacts = async () => {
    //     const response = await fetch(`${uri}/${user}`, 
    //         {
    //             method: 'GET'
    //         }
    //     )

    //     if(!response.ok) {
    //         console.log('Error: ', response.status, response.statusText)
    //     }

    //     const data = await response.json()
    //     setContactList(data.contacts)
    // }

    // useEffect(() => {getContacts()}, [])

    return (
        <div className="container">

            <h1 className="text-center">CONTACT LIST</h1>

            <ul className="list-group list-group-flush mt-5">
                {
                    contactList.length == 0 ? 

                    <h1 className="text-secondary mt-5">There are no contacts</h1>

                    :

                    contactList.map((iterator) => (
                        <li key={iterator.id} className="list-group-item">
    
                            <div className="card mb-3" style={{maxWidth: "540px"}}>
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
    
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}