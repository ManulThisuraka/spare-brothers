
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../../images/logo.png';
import NavBarCart from './CartItems/NavBarCart';
import NavBarAvatar from './NavBarAvatar';
import NavBarNotifications from "./Notifications/NavBarNotifications";
import NavBarSerach from "./NavBarSerach";

const linkStyle = {
    color: "#fff",
    fontFamily: 'Poppins',
    fontWeight: 300
}

const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '100px',
    boxShadow: '0px 0px 4px #FA334E'
}

function NavBar(props) {
    return (
        <div>
            <Navbar className="shadow-sm p-3 navbar-custom" collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand href="/"><img src={logo} alt="shop-logo" className="logo-image" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        {(props.getUserType === "Customer" || props.getUserType === "admin" || props.getUserType === "") && (
                        <Nav.Link href="/" style={linkStyle} className="mx-3">HOME</Nav.Link>
                        )}
                        {(props.getUserType === "") && (
                        <Nav.Link href="/unregisterAll" style={linkStyle} className="mx-3">SHOP</Nav.Link>
                        )}
                        {(props.getUserType === "admin") && (
                            <Nav.Link href="/productManage" style={linkStyle} className="mx-3">MANAGE</Nav.Link>
                        )}
                        {(props.getUserType === "Customer") && (
                            <Nav.Link href="/ShoppingAll" style={linkStyle} className="mx-3"  >SHOP</Nav.Link>
                        )}
                        {(props.getUserType === "Customer"  || props.getUserType === "admin" || props.getUserType === "") && (
                        <Nav.Link href="#" style={linkStyle} className="mx-3">ABOUT</Nav.Link>
                        )}
                        {(props.getUserType === "Customer"  || props.getUserType === "admin" || props.getUserType === "") && (
                        <Nav.Link href="#" style={linkStyle} className="mx-3">CONTACT</Nav.Link>
                        )}


                    </Nav>
                    <Nav>
                        {(props.getUserType === "Customer" || props.getUserType === "rider" || props.getUserType === "admin"  ) ? (
                            <Form>
                                <Nav className="mx-auto">
                                    <Nav.Link style={linkStyle} className="mx-2" >
                                        <NavBarCart userType={props.getUserType} userId={props.userId}/>
                                    </Nav.Link>

                                </Nav>
                            </Form>
                        ) : (
                            <Form>
                                <Button className="mx-3" variant="contained" style={buttonStyle} href="/signin">Sign In</Button>
                                <Button className="mx-3" variant="contained" style={buttonStyle} href="/signup">Sign Up</Button>
                            </Form>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;