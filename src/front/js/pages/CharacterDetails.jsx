import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CharacterDetails = () => {

    const { store } = useContext(Context);

    return (
        <div className="container mt-5 bg-dark border border-white border-3 rounded-4">
            <div className="">
                <div className="row g-0 mt-2">
                    <h1 className="text-center mb-3">{store.currentCharacter.name}</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5 border border-white border-3 rounded-4 mb-2">
                        <img className="img-fluid rounded-4" src="https://i.blogs.es/f6cd66/starwars7/650_1200.jpg" />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body ms-4 mt-2">
                            <p><strong>Height:</strong> {store.currentCharacter.height}</p>
                            <p><strong>Mass:</strong> {store.currentCharacter.mass}</p>
                            <p><strong>Hair Color:</strong> {store.currentCharacter.hair_color}</p>
                            <p><strong>Skin Color:</strong> {store.currentCharacter.skin_color}</p>
                            <p><strong>Birth Year:</strong> {store.currentCharacter.birth_year}</p>
                            <p><strong>Gender:</strong> {store.currentCharacter.gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}