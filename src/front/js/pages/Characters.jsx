import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Characters = () => {

    const { store } = useContext(Context);



    return (
        <div className="container">
             <ul className="list-group list-group-flush mt-5">
                {
                    store.characterList.map((iterator) => (
                        <li key={iterator.uid} className="list-group-item">
                            <div className="card" style={{width: "18rem"}}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{iterator.name}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}