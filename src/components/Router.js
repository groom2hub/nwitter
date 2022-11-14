import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { HashRouter as Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={ <Home /> } />,
                        <Route exact path="/profile" element={ <Profile /> } />
                    </>
                ) : (
                    <Route exact path="/" element={ <Auth /> } />
                )};
                {/* <Route element={ <Redirect from="*" to="/" /> } /> */}
            </Routes>
        </Router>
    )
}

export default AppRouter;