import React from 'react';
import style from "../../common/preloader/Preloader.module.css";
import preloader from "../../../assets/images/loading.svg";

const Preloader = (props) => {
    return <div className={style.preloader}><img src={preloader}/></div>
}

export default Preloader;