import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-ternary">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Home</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">Link</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
