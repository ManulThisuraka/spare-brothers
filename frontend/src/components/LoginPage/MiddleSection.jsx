import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from "axios"
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import loginBackground from '../../images/LoginBackground.jpg';
import {Typography} from "@material-ui/core";
import {Label} from "@material-ui/icons";


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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const type = "guest"
    const history = useHistory()

    function login(e) {
        e.preventDefault();

        const oldUser = {
            email,
            password
        }

        if(email == ""){
            toast.error("Email is empty", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }else if(password == ""){
            toast.error("Password is empty", { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
        }else{
            axios.post("http://localhost:8070/user/login", oldUser).then((response) => {
                if (response.data.message) {
                    toast.error(response.data.message, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 })
                } else {
                    toast.success('Login Success!', { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
                    localStorage.setItem("token", response.data.token)
                    if (response.data.usertype == "Seller") {
                        history.push("/product");
                        window.location.reload();
                    } else if (response.data.usertype == "rider") {
                        window.location.assign("/requests");
                    }
                else {
                        window.location.assign("/");
                    }
                }
            }).catch((err) => {
                alert(err)
            })

        }

    }

    return (
        <div>

            <div className="row ">
                <div className="col-lg-6 preview-image">

                </div>
                <div className="col-lg-6">

                    <div style={{display:"flex"}}>
                        <div style={{flex:"1"}}></div>
                        <div style={{flex:"2"}}>

                    <form style={{marginTop:"15%"}} className="input-form">
                        <p className="formPStyle" >
                            Welcome back
                            <hr width="200px" style={{color:"#FA334E", height:"5px", opacity:"1"}}/>

                        </p>
                        <div className="form-group">
                            <Typography className="form-labels">Email</Typography>
                            <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="email"  id="age" className="form-control" placeholder="Insert your email address"
                                       onChange={(event) => {
                                           setEmail(event.target.value)
                                       }} />
                        </div>
                        <div className="form-group" style={{marginTop:"5%"}}>
                            <Typography className="form-labels">Password</Typography>
                            <TextField variant="outlined" fullWidth size="small" style={inputBoxStyle} type="password" className="form-control" id="age" placeholder="Insert your password"
                                       onChange={(event) => {
                                           setPassword(event.target.value)
                                       }} />
                        </div>

                        <div style={{textAlign:"right", marginTop:"5%"}}>
                            <Button onClick={login} style={buttonStyle} type="submit">Sign In</Button>
                        </div>
                        <div style={{marginTop:"15%"}}>
                            <p style={{color:"#fff", fontWeight:"300"}}>Don't you have an account? <a style={{textDecoration:"none", color:"#fff", fontWeight:"600", marginLeft:"2%"}} href="/signup">Sign Up</a></p>
                        </div>
                    </form>



                        </div>
                        <div style={{flex:"1"}}></div>
                    </div>
                </div>
            </div>

            {/*<Container fluid>

                <Row>
                    <Col lg={6} sm={12} style={{ backgroundColor: "#ECE6F2", paddingTop: "5%" }}>



                    </Col>
                    <Col lg={6} sm={12} className="wholeColumn">
                        <div className="container">

                            <hr width="20%" align="left" className="hrStyle" />
                            <p className="pStyle" >
                                Welcome back
                            </p>


                            <form >
                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Email" style={inputBoxStyle} type="text" className="form-control" id="age" placeholder="Insert your email address"
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }} />
                                </div>
                                <div className="form-group">
                                    <TextField variant="outlined" fullWidth size="small" label="Password" style={inputBoxStyle} type="password" className="form-control" id="age" placeholder="Insert your password"
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }} />
                                </div>

                                <br />
                                <Button onClick={login} style={buttonStyle} type="submit">Sign In</Button>
                                <br />
                                <hr width="100%" align="center" style={hrStyle} />
                                <br />
                                <Button style={buttonSignUp} >Sign Up</Button>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </form>
                        </div>
                    </Col>

                </Row>
            </Container>*/}
        </div>);
}

export default MiddleSection;

