import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Cusotom component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages or Views
import { Home } from "./pages/Home.jsx";
import { Single } from "./pages/Single.jsx";
import { Contact } from "./pages/Contact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { Planets } from "./pages/Planets.jsx";
import { PlanetDetails } from "./pages/PlanetDetails.jsx";
import { Starships } from "./pages/Starships.jsx";
import { StarshipDetails } from "./pages/StarshipDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { Products } from "./pages/Products.jsx";




//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<EditContact />} path="/edit-contact" />
                        <Route element={<Characters />} path="/people" />
                        <Route element={<CharacterDetails />} path="/people/:id" />
                        <Route element={<Planets />} path="/planet" />
                        <Route element={<PlanetDetails />} path="/planet/:id" />
                        <Route element={<Starships />} path="/starship" />
                        <Route element={<StarshipDetails />} path="/starship/:id" />
                        <Route element={<Products />} path="/products" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
