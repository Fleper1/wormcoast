import React, {FC} from 'react';
import cl from "./Loader.module.css"

const Loader: FC = ()  => {
    return (
        <div style={{height: "100%", width: "100%"}}>
            <div className={cl.loader}></div>
        </div>
    );
};

export default Loader;