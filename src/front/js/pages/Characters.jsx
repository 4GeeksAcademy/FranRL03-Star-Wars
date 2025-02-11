import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Characters = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {
                    store.characterList.map((iterator) => (
                        <div className="col" key={iterator.uid}>
                            <div className="card h-100" style={{ width: "18rem" }}>
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${iterator.uid}.jpg`}
                                    className="card-img-top" alt={iterator.name} onError={(e) => e.target.src = "https://i.blogs.es/f6cd66/starwars7/650_1200.jpg"} />
                                <div className="card-body">
                                    <h5 className="card-title">{iterator.name}</h5>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/people/${iterator.uid}`} onClick={() => actions.getDetailsCharacter(iterator.url)} className="btn btn-dark rounded-4">Description</Link>
                                        <button type="button" onClick={() => {store.favorites.some(fav => fav.name === iterator.name) ? actions.removeFavorites(iterator) : actions.addFavorites(iterator)}}
                                            className={`btn rounded-4 ${store.favorites.some(fav => fav.name === iterator.name)  ? 'btn-danger' : 'btn-outline-warning'} `}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={`${store.favorites.some(fav => fav.name === iterator.name)  ? 'white' : 'yellow'}`} className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}