import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const PlanetDetails = () => {

    const { store } = useContext(Context);

    return (
        <div className="container mt-5 bg-dark border border-white border-3 rounded-4">
            <div className="">
                <div className="row g-0 mt-2">
                    <h1 className="text-center mb-3">{store.currentPlanet.name}</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-2">
                        <img className="img-fluid rounded-4" src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${store.currentPlanet.uid}.jpg`} onError={(e) => e.target.src = "https://i.blogs.es/f6cd66/starwars7/650_1200.jpg"} />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body ms-4 mt-2">
                            <p><strong>Diameter:</strong> {store.currentPlanet.diameter} m2</p>
                            <p><strong>Rotation Period:</strong> {store.currentPlanet.rotation_period} days</p>
                            <p><strong>Orbital Period:</strong> {store.currentPlanet.orbital_period} days</p>
                            <p><strong>Gravity:</strong> {store.currentPlanet.gravity}</p>
                            <p><strong>Climate:</strong> {store.currentPlanet.climate}</p>
                            <p><strong>Terrain:</strong> {store.currentPlanet.terrain}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}