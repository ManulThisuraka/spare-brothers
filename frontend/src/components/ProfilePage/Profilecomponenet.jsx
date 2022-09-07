import React, { useState, useEffect } from 'react';
import ProfileMiddleSection from "./ProfileMiddleSection";
import NavBar from "../HomePage/NavBar/NavBar"
import axios from "axios";


function Profilecomponenet(){

    const [userType, setUserType] = useState('');

    return(<div>
        <ProfileMiddleSection />
    </div>);
}

export default  Profilecomponenet;