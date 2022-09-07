import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "../HomePage/HomePage";

export default function Sessions(){

    const [userType, setUserType] = useState('')

    const getusertype = async () => {
        const access_token = localStorage.getItem('token')
        let config = {
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        }
        axios.get('http://localhost:8070/user/post', config).then((response) => {
          if (response.data.message) {
            alert(response.data.message)
          } else {
            setUserType(response.data.user.usertype)
          }
        })
          .catch()
      };
      getusertype();
      
    return(
        <div>
            <Homepage getusertype={userType} />
        </div>
    );
}