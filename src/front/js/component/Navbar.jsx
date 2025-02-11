import React, { useActionState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
			<div className="container-fluid ms-5">
				<Link className="navbar-brand" to="/">Home</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/people">Characters</Link>
						</li>
					</ul>
				</div>
				<div className="btn-group me-5">
					<button type="button" className="btn btn-warning dropdown-toggle me-2 text-secondary rounded-4" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
						<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
							{store.favorites.length}
						</span>
					</button>
					<ul className="dropdown-menu">
						{store.favorites.length > 0 ? (
							store.favorites.map((favorite) => (
								<li key={favorite} className="dropdown-item">
									{favorite.name}
									<svg xmlns="http://www.w3.org/2000/svg" onClick={() => actions.removeFavorites(favorite)} width="16" height="16" fill="red" className="bi bi-trash-fill ms-2" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
									</svg>
								</li>
							))
						) : (
							<li className="dropdown-item text-muted">No favorites yet</li>
						)
						}
					</ul>
				</div>
			</div>
		</nav >
	);
};
