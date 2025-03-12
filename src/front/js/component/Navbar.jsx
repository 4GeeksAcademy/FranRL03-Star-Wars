import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoStarWars from "../../img/logoStarWars.png";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	const navigate = useNavigate()

	const handleThemeChange = () => {
		const theme = isDarkTheme ? 'flatly' : 'superhero';
		setIsDarkTheme(!isDarkTheme)
		actions.setTheme(theme)

		const themeStylesheet = document.getElementById("theme-stylesheet");
		themeStylesheet.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${theme}/bootstrap.min.css`;
	}

	const handleAccess = () => {
		if (store.isLogged) {
			actions.logout();
		} else {
			navigate('/login');
		}
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
			<div className="container-fluid ms-5">
				<a class="navbar-brand">
					<img src={logoStarWars} alt="Bootstrap" width="100" height="40" />
				</a>
				<Link className="navbar-brand" to="/">Home</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/people">Characters</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/planet">Planets</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/starship">Starships</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/products">Products</Link>
						</li>
					</ul>
				</div>
				<div className="me-3">
					<button
						className="btn btn-outline-light border-0"
						onClick={(handleThemeChange)}
					>
						<i className={`fa ${isDarkTheme ? "fa-sun" : "fa-moon"}`}></i>
					</button>
				</div>
				<div className="btn-group me-5">
					<button type="button" className={`btn btn-warning dropdown-toggle me-2 ${isDarkTheme ? 'text-secondary' : 'text-light'} rounded-4`} data-bs-toggle="dropdown" aria-expanded="false">
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
				<div className="me-4">
				<button onClick={handleAccess} type="button" className="btn btn-primary me-2 rounded-4">{store.isLogged ? 'Log out' : 'Login'}</button>
				{!store.isLogged ? (<Link to="/register" className="btn btn-secondary rounded-4">Register</Link>) : (<Link to="/profile" className="btn btn-secondary rounded-4">My Profile</Link>)}
				</div>
			</div>
		</nav >
	);
};
