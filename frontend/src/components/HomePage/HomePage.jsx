import NavBar from "./NavBar/NavBar";
import HomeMiddle from "./Middle Section/HomeMiddle";
import '../../styles/home.css';
import {useEffect, useState} from "react";
import axios from "axios";

function Homepage(){

    return(
        <div>
            <HomeMiddle />
        </div>
    );
}

export default Homepage;