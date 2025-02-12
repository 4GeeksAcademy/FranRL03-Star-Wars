import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const StarshipDetails = () => {

    const { store } = useContext(Context);

    return (
        <div className="container mt-5 bg-dark border border-white border-3 rounded-4">
            <div className="">
                <div className="row g-0 mt-2">
                    <h1 className="text-center mb-3">{store.currentStarship.name}</h1>
                    <div className="col-md-7 col-lg-6 col-xl-5 mb-2">
                        <img className="img-fluid rounded-4" src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${store.currentStarship.uid}.jpg`} onError={(e) => e.target.src = "https://i.blogs.es/f6cd66/starwars7/650_1200.jpg"} />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body ms-4 mt-2">
                            <p><strong>Model:</strong> {store.currentStarship.model}</p>
                            <p><strong>Starship Class:</strong> {store.currentStarship.starship_class}</p>
                            <p><strong>Passengers:</strong> {store.currentStarship.passengers}</p>
                            <p><strong>Consumables:</strong> {store.currentStarship.consumables}</p>
                            <p><strong>Max atmosphering speed:</strong> {store.currentStarship.max_atmosphering_speed}</p>
                            <p><strong>Crew:</strong> {store.currentStarship.crew}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}