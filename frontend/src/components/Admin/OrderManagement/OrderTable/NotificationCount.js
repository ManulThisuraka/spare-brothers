import React, {useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


import axios from "axios";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginBottom: theme.spacing(2),
        },
        '& .MuiBadge-root': {
            marginRight: theme.spacing(4),
        },
    },
}));

export default function NotificationCount(props){
    const history = useHistory()
    const classes = useStyles();
    const [count, setCount] = useState(1);
    const [count2, setCount2] = useState(1);


        useEffect(()=>{
            function getCount() {
                axios.get("http://localhost:8070/order/count")
                    .then((response) => {
                        setCount(response.data)
                    })
                    .catch((error) => {

                    })
            }

            getCount()


            if(props.id!=null){
                function getCount2() {
                    axios.get(`http://localhost:8070/order/count2/${props.id}`)
                        .then((response) => {
                            setCount2(response.data)
                        })
                        .catch((error) => {

                        })
                }



                 getCount2()
            }






        })



    function navigateRider(){
            history.push('/requests')
    }

    function navigateAdmin(){
        history.push('/orders')
    }

    return(
        <div>

            <Badge color="secondary" badgeContent={count} hidden={props.usertype!='admin'} onClick={navigateAdmin}>
                <MailIcon style={{color:'white'}}/>
            </Badge >

            <Badge color="secondary" badgeContent={count2} hidden={props.usertype!='rider'} onClick={navigateRider}>
                <MailIcon style={{color:'white'}}/>

            </Badge>
        </div>
    )
}