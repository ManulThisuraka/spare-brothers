import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import logo from '../../images/largeLogo.png';
import {Typography} from "@material-ui/core";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const buttonStyle = {
    backgroundColor: "#FA334E",
    color: "#fafafa",
    fontWeight: 700,
    width: "100px",
    height: "40px",
    textTransform: "capitalize",
    fontFamily: 'Montserrat',
    borderRadius: "5px",
    zIndex: "99",
    marginTop: "5%"
}
const inputBoxStyle = {
    width: "400px",
    marginTop: "3%"
}

const hrStyle = {
    marginBottom: "10%",
    marginTop: "10%",
    border: "1px solid #5E4FA2",
    opacity: "23%"
}

const h1Style = {
    color: "#5E4FA2",
    fontSize: "45px",
    fontWeight: "600",
    fontFamily: "Montserrat"
}

const pStyle = {
    color: "#5E4FA2",
    fontSize: "25px",
    fontWeight: "400"
}

toast.configure()

function MiddleSection() {

    const location = useLocation();
    const [userID, setUserID] = useState("")
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setConPassword] = useState("")
    const history = useHistory()
    const [name,setUserName] = useState("")
    

    useEffect(() => {

        const getUserDetails = async () => {
            const access_token = localStorage.getItem('token')
            console.log(access_token)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            axios.get('http://localhost:8070/user/post', config).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {
                    setUserID(response.data.user._id)
                    setName(response.data.user.username)
                    setEmail(response.data.user.email)
                    setUserName(response.data.user.username)
                }
            })
                .catch()
        };
        getUserDetails()
    }, []);


    function updateProfile(e) {
        e.preventDefault();

        const newUser = {
            userID,
            username,
            password
        }
        if(password == "" || cpassword == ""){
            toast.warn("passwrod cannot be empty",{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if (password != cpassword) {
            toast.warn("Password dosent match",{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }
        else {
            axios.put("http://localhost:8070/user/profileUpdate", newUser).then((response) => {
                if (response.data.Error) {
                    toast.warn('Error',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
                } else {
                    toast.success("profile Details updated succesfully. Login again",{position: toast.POSITION.TOP_CENTER , autoClose:2000})
                    localStorage.removeItem('token')
                    window.location.assign('/signin')
                }
            }).catch((err) => {
                toast.warn(err.message,{position: toast.POSITION.TOP_CENTER , autoClose:2000})
            })
        }
    }


    return (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"5%"}}>
                <div className="row input-form-frame">
                        <div className="col-lg-6" style={{padding:"10% 5% 0 0"}}>
                            <img src={logo} style={{width:"400px", height:"auto"}} alt=""/>
                        </div>
                        <div className="col-lg-6">
                            <form>
                            <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>User ID : {userID}</label>
                            <div className="form-group" style={{marginTop:"5%"}}>
                                <Typography className="form-labels">Username</Typography>
                                <TextField variant="outlined" value={username} fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="username"
                                           onChange={(event) => {
                                               setName(event.target.value)
                                           }} />
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Email</Typography>
                                    <TextField variant="outlined" value={email} disabled={true} fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setEmail(event.target.value)
                                               }} />
                                </div>
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Enter new Password</Typography>
                                    <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setPassword(event.target.value)
                                               }} />
                                </div>
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Confirm new Password</Typography>
                                    <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setConPassword(event.target.value)
                                               }} />
                                </div>
                                <div style={{textAlign:"right", marginTop:"5%"}}>
                                <Button style={buttonStyle} type="submit" className="btn btn-primary" onClick={updateProfile}>Submit</Button>
                                </div>

                            </div>
                            </form>

                    </div>
                </div>

            {/*<Container fluid>
                <Row>
                    <Col lg={5} sm={12} style={{ backgroundColor: "#ECE6F2", paddingTop: "5%" }}>

                    </Col>

                    <Col lg={7} sm={12} className="wholeColumn">
                        <div className="container">

                            <hr width="20%" align="left" className="hrStyle" />
                            <p className="pStyle" >
                                Hello {name}
                            </p>

                            <form id="myForm">
                                <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>User ID : {userID}</label>
                                <div className="form-group">
                                    <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>Username</label>
                                    <TextField variant="outlined" value={username} fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="username"
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>Email</label>
                                    <TextField variant="outlined" value={email} disabled={true} fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>Enter new Password</label>
                                    <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ marginLeft: "2%", color: "white", marginTop: "3%" }}>Confirm new Password</label>
                                    <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setConPassword(event.target.value)
                                        }} />
                                </div>

                                <Button style={buttonStyle} type="submit" className="btn btn-primary" onClick={updateProfile}>Submit</Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
            */}

        </div>

    )
}

export default MiddleSection;
