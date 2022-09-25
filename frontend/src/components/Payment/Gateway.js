import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

export default function Gateway(props) {
  const [open, setOpen] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    price: 5000,
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
    <div>
      <StripeCheckout
        stripeKey="pk_test_51KzbuqSAsvHxyVvO3dHnBOs75m9pdic6KSbOliikKsSPLqvK83B2YQB8rm0xyBMNaAIEMMGzybPYr9PzqgyIn3UB00zfvQqewZ"
        token={makePayment}
        amount={product.price * 100}
        name="Enter your card details"
        // billingAddress
        // shippingAddress
      >
        {/*<Button style={buttonStyle} >Pay</Button>*/}
      </StripeCheckout>

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
          <FormHelperText style={{ color: "red" }}>{helperText}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
