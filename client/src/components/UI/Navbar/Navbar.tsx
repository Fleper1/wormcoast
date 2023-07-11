import React from 'react';
import cl from "./Navbar.module.css"
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={cl.navMenu}>

            <Link className={cl.link} to={"/"}>Task</Link>
            <Link className={cl.link} to={"/result"}>Result</Link>
            <Link className={cl.link} to={"/download"}>Download</Link>

            <div className={cl.dot}></div>
        </div>
    );
};

export default Navbar;