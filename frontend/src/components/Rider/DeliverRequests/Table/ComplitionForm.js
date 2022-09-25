import React, {useEffect, useState} from "react";
import axios from "axios"
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import '../../../../styles/orderinfo.css'
import TableCell from '@material-ui/core/TableCell';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {FormHelperText} from "@material-ui/core";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#5E4FA2',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}))(TableCell);

const buttonStyle = {
    backgroundColor: "#d5d5ce",
    color: "#000000",

}


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
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


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ComplitionForm(props) {


    const [helperText, setHelperText] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);


    //snack Bar
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [DeliveryDate, setDeliveryDate] = useState();
    const [TimeRelease, setTimeRelease] = useState();
    const [TimeReceived, setTimeReceived] = useState();

    function changeRequest(id) {
        const stateChanged = {
            request: "Completed",
        }
        axios.put(`http://localhost:8070/order/update/${id}`, stateChanged)
            .then((res) => {
               // alert("updated")
                window.location.reload(true)
            })
            .catch(error => {
                alert(error)
            })
    }


    function onSubmit(e){
        e.preventDefault();

        const orderObject={
            DeliveryDate : DeliveryDate,
            TimeReleased :TimeRelease,
            TimeReceived : TimeReceived,
            orders:   props.orderId,
            riders:props.riderId,
            orderId:props.order
        }

        axios.post("http://localhost:8070/complete/create/",orderObject)
            .then((res) => {
                setOpenSnack(true);
                setOpen(false);
                setTimeout(() => {
                    window.location.reload(true)
                }, 1000)
                changeRequest(props.orderId)
            })
            .catch(error => {
                alert(error)
            })

    }


    const ValidateForm = (event) => {
        event.preventDefault();

        if (DeliveryDate == null && TimeRelease == null && TimeReceived == null ) {
            setHelperText('Please fill all the fields');

        } else if (DeliveryDate == null) {
            setHelperText('Please Select Date delivered');

        }
        else if (TimeRelease == null) {
            setHelperText('Please Select Time Released');

        }else if (TimeReceived == null) {
            setHelperText('Please Select Time Received');

        }
        else {
            onSubmit(event)
        }
    };


    const [currentDate, setCurrentDate] = useState("");

    useEffect(()=>{


        const today = new Date()
        let date='';
            const month = today.getMonth()+1
        if (month<10){
            date = today.getFullYear() + '-0' + month + '-' + today.getDate();
        }

        else{
            date = today.getFullYear() + '-' +month + '-' + today.getDate();
        }

        setCurrentDate(date)
        console.log(currentDate)

    })



    return (
        <div>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Sent Successfully!
                </Alert>
            </Snackbar>

            <Button    variant="contained"
                       color="primary" onClick={handleClickOpen}  disabled={props.state=="Completed" ||props.state=="pending" || props.state=="Declined"}>
                Mark As Complete
            </Button>



            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                    className='completion-info'>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} className="form-background">
                    Delivery Confirmation Form
                    <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
                </DialogTitle>
                <form onSubmit={ValidateForm}>
                    <DialogContent dividers className="form-background">



                        <div className="completion-form" style={{marginTop: '-60px'}}>




                            <div className="completion-text">
                                <label>Delivery date : </label>
                                <TextField   inputProps={{
                                    min: currentDate
                                }} type='date' name="date" color="secondary" fullWidth minDate={new Date()}
                                           onChange={(event) => {
                                               setHelperText(' ');
                                               setDeliveryDate(event.target.value);
                                           }}/>
                            </div>

                            <div className="completion-text">
                                <label>Time Released: </label>
                                <TextField type='time' id="standard-basic" placeholder="Description" color="secondary"
                                           fullWidth
                                           onChange={(event) => {
                                               setHelperText(' ');
                                               setTimeRelease(event.target.value);
                                           }}/>
                            </div>
                            <div className="completion-text">
                                <label>Time Received : </label>
                                <TextField type='time' placeholder="Category" color="secondary" fullWidth
                                           onChange={(event) => {
                                               setHelperText(' ');
                                               setTimeReceived(event.target.value);
                                           }}
                                />
                            </div>

                            <div className="completion-button">
                                <Button type="submit" className="contactButton">Send</Button>
                            </div>
                        </div>


                    </DialogContent>


                </form>


            </Dialog>


        </div>
    )
}