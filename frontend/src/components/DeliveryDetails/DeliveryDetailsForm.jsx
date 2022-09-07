import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import axios from "axios";
import { UilSearch } from "@iconscout/react-unicons";
import "../../styles/delivery.css";
import Gateway from "../Payment/Gateway";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { FormHelperText } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import StripeCheckout from "react-stripe-checkout";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const buttonStyle = {
  color: "#fff",
  backgroundColor: "#FA334E",
  fontFamily: "Poppins",
  fontWeight: 400,
  borderRadius: "6px",
  width: "100px",
  boxShadow: "0px 0px 3px #FA334E",
  textTransform: "capitalize",
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeliveryDetailsForm({ itemObject, itemsids }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");
  const [carttotal, setCartTotal] = useState(itemObject.cartTotal);
  const [deliveryfee, SetDeliFee] = useState(itemObject.deliveryFee);
  const [discount, setDiscount] = useState(itemObject.totDiscount);
  const [total, setTotal] = useState(itemObject.totalFee);
  const [itemid, setItemID] = useState(itemsids);
  const [km, setKm] = useState("");
  const [finaltot, SetFinalTot] = useState("");
  const [userid, setUserID] = useState("");

  const [open, setOpen] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    SetFinalTot(itemObject.totalFee);
    const getUserDetails = async () => {
      const access_token = localStorage.getItem("token");
      console.log(access_token);
      let config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
      axios
        .get("http://localhost:8070/user/post", config)
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            setUserID(response.data.user._id);
          }
        })
        .catch();
    };
    getUserDetails();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function makeOrder() {
    var itemPrice = [];
    var itemname = [];

    itemObject.products.map((item) => {
      itemPrice = itemPrice.concat(item["value"]);
      itemname = itemname.concat(item["name"]);
    });

    const newObject = {
      total: itemObject.totalFee,
      name: name,
      addres: address,
      city: city,
      postal: postal,
      phone: phone,
      itemname: itemname,
      itemPrice: itemPrice,
      userid: userid,
    };

    axios
      .post("http://localhost:8070/order/create", newObject)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [openSnack, setOpenSnack] = React.useState(false);
  //snack Bar
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const [product] = useState({
    name: "Your Order is ready After Payment",
    price: finaltot.toString,
    description: "Cool car",
  });

  async function makePayment(token, addresses) {
    const response = await axios
      .post(`http://localhost:8070/make/payment`, { token, product })
      .then((response) => {
        console.log(response.data);
        setUrl(response.data);
        setOpenSnack(true);
        handleClickOpen();
      })
      .catch(() => {
        alert("Payment Failed");
      });
  }

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div
          className="d-flex justify-content-center"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="delivery-form" style={{ height: "fit-content" }}>
            {/* <h4>Add Delivery Details</h4> */}
            <h4 style={{ color: "white", fontSize: "40px" }}>
              Delivery Details
            </h4>

            <div className="delivery-text">
              <TextField
                placeholder="Name"
                name="wishlistName"
                color="secondary"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                fullWidth
              />
            </div>
            <div className="delivery-text">
              <TextField
                id="standard-basic"
                name="wishlistDescription"
                placeholder="Address"
                color="secondary"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                fullWidth
              />
            </div>
            <div className="delivery-text" style={{ display: "flex" }}>
              <div style={{ flex: "5" }}>
                <div className="delivery-text" style={{ marginRight: "10px" }}>
                  <TextField
                    id="standard-basic"
                    name="wishlistDescription"
                    placeholder="City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    color="secondary"
                  />
                </div>
              </div>
              <div style={{ flex: "5" }}>
                <div className="delivery-text">
                  <TextField
                    id="standard-basic"
                    name="wishlistDescription"
                    placeholder="Postal"
                    onChange={(e) => {
                      setPostal(e.target.value);
                    }}
                    color="secondary"
                  />
                </div>
              </div>
            </div>
            <div className="delivery-text">
              <div className="delivery-text">
                <TextField
                  id="standard-basic"
                  name="wishlistDescription"
                  placeholder="Phone"
                  color="secondary"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  fullWidth
                />
              </div>
              {/*<div className="delivery-text">
                <TextField id="standard-basic"  name="wishlistDescription"  placeholder="Enter Km" color="secondary" onChange={e=>{
                    setKm(e.target.value)
                }} fullWidth/>
            </div>*/}
            </div>
            {/*<h6> Rs.20 delivery charge per Km</h6>
            <h6 style={{color:"white", fontSize:"20px"}}>Item Total : {itemObject.totalFee}</h6>*/}
            <p style={{ color: "white", fontSize: "15px" }}>
              Delivery Charges : {itemObject.deliveryFee}
            </p>
            <h6 style={{ color: "white", fontSize: "20px" }}>
              Final Total : {finaltot}
            </h6>
            {/* <div className="delivery-button">
                <Button style={buttonStyle} onClick={e=>{
                    makeobject()
                }}>Pay</Button>
            </div> */}
            {/* <Gateway total = {finaltot} /> */}
            <div>
              <div style={{ textAlign: "center" }}>
                <StripeCheckout
                  stripeKey="pk_test_51KzbuqSAsvHxyVvO3dHnBOs75m9pdic6KSbOliikKsSPLqvK83B2YQB8rm0xyBMNaAIEMMGzybPYr9PzqgyIn3UB00zfvQqewZ"
                  token={makePayment}
                  amount={finaltot * 100}
                  name="Enter your card details"

                  // billingAddress
                  // shippingAddress
                >
                  <Button
                    style={buttonStyle}
                    onClick={(e) => {
                      makeOrder();
                    }}
                  >
                    Pay
                  </Button>
                </StripeCheckout>
              </div>

              <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
              >
                <Alert onClose={handleCloseSnackBar} severity="success">
                  Payment Successfully!
                </Alert>
              </Snackbar>
              {/*<Button variant="contained" color="primary" onClick={handleClickOpen}>*/}
              {/*    Update*/}
              {/*</Button>*/}
              <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                  className="form-background"
                >
                  Your payment Receipt
                </DialogTitle>
                <DialogContent dividers style={{ width: "500px" }}>
                  <Button variant="outlined" color="primary" href={url}>
                    Click Here To Get It
                  </Button>
                  <FormHelperText style={{ color: "red" }}>
                    {helperText}
                  </FormHelperText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
