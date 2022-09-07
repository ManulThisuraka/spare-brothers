import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Typography} from "@material-ui/core";

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

const buttonSignUp = {
    color: "#fafafa",
    fontWeight: 700,
    fontSize: "18px",
    fontFamily: 'Montserrat',
    borderRadius: "8px",
    border: "3px solid #FA334E",
}

const inputBoxStyle = {
    width: "500px",
    marginTop: "3%"
}

const hrStyle = {
    marginBottom: "10%",
    marginTop: "10%",
    border: "1px solid #5E4FA2",
    opacity: "23%"
}

const imgStyle = {
    margin: "8% 25% 5%",
    width: "50%",
    height: "auto"
}

const h1Style = {
    color: "#f7312a",
    fontSize: "45px",
    fontWeight: "600",
    fontFamily: "Montserrat"
}

const loginPathImg = {
    position: "absolute",
    width: "14%",
    height: "auto",
    fontFamily: "Montserrat sans-serif"
}

toast.configure()
function MiddleSection() {

    const location = useLocation();
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword,setConPassword] = useState("")
    const [usertype, setUser] = useState("")
    const [check, setCheck] = useState("")
    const [userType, setUserType] = useState('Customer')
    const history = useHistory()


    function register(e) {
        e.preventDefault();

        const newUser = {
            username,
            email,
            password,
            userType
        }
        
        if(username == ""){
            toast.warn('Username is empty',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if(email == ""){
            toast.warn('Email is empty',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if(password == ""){
            toast.warn('Password is empty',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if(cpassword == ""){
            toast.warn('Confirm password is empty',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if (check != "true") {
            toast.warn('Accept terms and conditions',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else if(password != cpassword){
            toast.warn('Password dosent match',{position: toast.POSITION.TOP_CENTER , autoClose:2000})
        }else {
            axios.post("http://localhost:8070/user/register", newUser).then((response) => {
                if (response.data.Error) {
                    toast.error(response.data.Error,{position: toast.POSITION.TOP_CENTER , autoClose:2000})
                    document.getElementById("myForm").reset();
                }else{
                    toast.success(response.data.message,{position: toast.POSITION.TOP_CENTER , autoClose:2000})
                    window.location.assign("/signin")
                }
            }).catch((err) => {
                toast.error(err.message,{position: toast.POSITION.TOP_CENTER , autoClose:2000})
            })
        }
    }


    return (
        <div>

            <div className="row">
                <div className="col-lg-6 reg-background">

                </div>
                <div className="col-lg-6">

                    <div style={{display:"flex"}}>
                        <div style={{flex:"1"}}></div>
                        <div style={{flex:"2"}}>
                            <form style={{marginTop:"10%"}} className="input-form">
                                <p className="formPStyle" style={{fontSize:"45px"}} >
                                    Create your Account
                                    <hr width="300px" style={{color:"#FA334E", height:"5px", opacity:"1"}}/>
                                </p>
                                <div className="form-group">
                                    <Typography className="form-labels">Username</Typography>
                                    <TextField required variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="username"
                                               onChange={(event) => {
                                                   setName(event.target.value)
                                               }} />
                                </div>
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Email</Typography>
                                    <TextField required variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setEmail(event.target.value)
                                               }} />
                                </div>
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Password</Typography>
                                    <TextField required variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setPassword(event.target.value)
                                               }} />
                                </div>
                                <div className="form-group" style={{marginTop:"5%"}}>
                                    <Typography className="form-labels">Confirm Password</Typography>
                                    <TextField required variant="outlined" fullWidth size="small" style={inputBoxStyle} type="text" className="form-control" id="age"
                                               onChange={(event) => {
                                                   setConPassword(event.target.value)
                                               }} />
                                </div>

                                <div className="form-group" style={{textAlign:"left", marginTop:"5%"}}>
                                    <input type="checkbox" value="true" id="flexCheckDefault" onChange={(event) => {
                                        setCheck(event.target.value)
                                    }} />
                                    <label style={{ marginLeft: "2%" , color: "white" , marginTop: "3%"} }>
                                        I agreed terms and conditions.
                                    </label>
                                    <br />
                                </div>

                                <div style={{textAlign:"right", marginTop:"5%"}}>
                                    <Button  style={buttonStyle} type="submit" onClick={register}>Sign In</Button>
                                </div>
                                <br />
                            </form>
                        </div>
                        <div style={{flex:"1"}}></div>
                    </div>
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
                                Create your Account
                            </p>

                            <form id="myForm">

                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Username" style={inputBoxStyle} type="text" className="form-control" id="username"
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Email" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Password" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Confirm Password" style={inputBoxStyle} type="text" className="form-control" id="age"
                                        onChange={(event) => {
                                            setConPassword(event.target.value)
                                        }} />
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" value="true" id="flexCheckDefault" onChange={(event) => {
                                        setCheck(event.target.value)
                                    }} />
                                    <label style={{ marginLeft: "2%" , color: "white" , marginTop: "3%"} }>
                                        I agreed terms and conditions.
                                    </label>
                                    <br />
                                </div>

                                <Button style={buttonStyle} type="submit" className="btn btn-primary" onClick={register}>Sign In</Button>
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
