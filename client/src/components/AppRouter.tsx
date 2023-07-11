import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Router} from "../router/router";

const AppRouter = () => {
    return (
        <Routes>
            {Router.map(rout =>
                <Route key={rout.path} path={rout.path} element={rout.element}/>
            )}
            <Route path="/*" element={<Navigate to="/error"/>}/>
        </Routes>
    );
};

export default AppRouter;