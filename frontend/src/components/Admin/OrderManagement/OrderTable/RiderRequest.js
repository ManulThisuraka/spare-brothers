import React, {useEffect, useState} from "react";
import axios from "axios";

export default function RiderRequest(props) {

    const [uname, setUname] = useState('');

    const id = props.id
    useEffect(() => {

        function getUser() {
            axios.get(`http://localhost:8070/order/rider/${props.id}`)
                .then((response) => {

                    if (response.data._id == null) {
                        setUname('Not Assigned')

                    } else {
                        setUname(response.data.riderName)
                    }
                    console.log(response.data.riderName)


                })
                .catch((error) => {

                })
        }

        getUser()
    }, [])

    return (
        <div>
            {uname}
        </div>
    )
}