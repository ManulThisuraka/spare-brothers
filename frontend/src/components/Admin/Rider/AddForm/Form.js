import React, {useState} from "react";
import axios from "axios"
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import '../../../../styles/rider.css'
import {FormHelperText} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Form() {
    const [open, setOpen] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //snack Bar
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };


    const types = [
        {
            value: 'Van',
            label: 'Van',
        },
        {
            value: 'Three Wheel',
            label: 'Three Wheel',
        },
        {
            value: 'Lorry',
            label: 'Lorry',
        }


    ];


    //set Data to useStates
    const [riderName, setRiderName] = useState("");
    const [nic, setNic] = useState("");
    const [phone, setPhone] = useState("");
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    function onSubmit(e) {

        e.preventDefault()
        const RiderObject = {
            riderName: riderName,
            riderNic: nic,
            riderPhone: phone,
            vehicleType: type,
            vehicleNumber: number,
            email:email
        }

        axios.post("http://localhost:8070/rider/create", RiderObject)
            .then((res) => {

                setOpenSnack(true);
                setOpen(false);
                setTimeout(() => {
                    window.location.reload(true)
                }, 1000)

            })
            .catch(error => {
                alert(error)
            })
    }

    const vehicleTypeChange = (event) => {
        setHelperText(' ');
        setType(event.target.value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        if (riderName == '' && nic == '' && phone == ''&& type == ''&& number == '' ) {
            setHelperText('Please fill all the fields');

        } else if (riderName == '') {
            setHelperText('Please Enter Rider Name');

        }
        else if (email == '') {
            setHelperText('Please Enter Email');

        }else if (nic == '') {
            setHelperText('Please Enter NIC Number');

        }  else if (phone == '') {
            setHelperText('Please Enter Mobile Number');

        } else if (number == '') {
            setHelperText('Please Enter Vehicle Number');

        } else if (type == '') {
            setHelperText('please Select Vehicle Type');

        }
        else if (phone.length<10 || phone.length>10) {
            setHelperText('please Enter Valid Phone Number');

        }

        else {
            onSubmit(event)
        }
    };


    return (

        <div style={{zIndex:"-99"}}>
        
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Inserted Successfully!
                </Alert>
            </Snackbar>

            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Add New
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} >
                     New Rider
                    <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>


                        <div className="rider-form" style={{marginTop: '-60px'}}>


                            <div className="completion-text">
                                <TextField
                                    type='text'
                                    color="secondary"
                                    inputProps={{pattern: "[A-Za-z. ]{1,75}"}}
                                    label="Rider Name"
                                    placeholder="W.P. Kumara"
                                    onChange={(event) => {
                                        setHelperText(' ');
                                        setRiderName(event.target.value)
                                    }}
                                    fullWidth/>
                            </div>

                            <div className="completion-text">
                                <TextField
                                    type='email'
                                    color="secondary"
                                    label="Rider Email"
                                    placeholder="abc@gmail.com"
                                    onChange={(event) => {
                                        setHelperText(' ');
                                        setEmail(event.target.value)
                                    }}
                                    fullWidth/>
                            </div>

                            <div className="completion-text">
                                <TextField
                                    inputProps={{pattern: "[0-9vV ]{1,10}"}}
                                    color="secondary"
                                    type='text'
                                    label="Rider NIC"
                                    placeholder="984511452V"
                                    onChange={(event) => {
                                        setHelperText(' ');
                                        setNic(event.target.value)
                                    }}
                                    fullWidth/>
                            </div>


                            <div className="completion-text">
                                <TextField
                                    color="secondary"
                                    inputProps={{pattern: "[0-9]{1,20}"}}
                                    type='text'
                                    label="Rider Phone"
                                    placeholder="0717845412"
                                    onChange={(event) => {
                                        setHelperText(' ');
                                        setPhone(event.target.value)

                                    }}
                                    fullWidth

                                />
                            </div>


                            <div className="completion-text">
                                <TextField
                                    color="secondary"
                                    type='text'
                                    inputProps={{pattern: "[A-Za-z0-9- ]{1,75}"}}
                                    label="Vehicle Number"
                                    placeholder="PA-5684"
                                    onChange={(event) => {
                                        setHelperText(' ');
                                        setNumber(event.target.value)
                                    }}
                                    fullWidth
                                />
                            </div>

                            <div className="completion-text">
                                <TextField
                                    color="secondary"
                                    id="outlined-select-currency"
                                    type='select'
                                    select
                                    label="Select Vehicle Type"
                                    value={type}
                                    onChange={vehicleTypeChange}
                                    variant='outlined'
                                    fullWidth
                                >
                                    {types.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </div>



                        </div>


                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Insert
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}