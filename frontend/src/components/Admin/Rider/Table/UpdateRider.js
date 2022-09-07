import React, {useState} from "react";
import axios from "axios"
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {FormHelperText} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

export default function (props) {
    const [open, setOpen] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',

        },
    }));

    const classes = useStyles();

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


    const [openSnack, setOpenSnack] = React.useState(false);
    //snack Bar
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    let id = props.id;
    let riderName = props.riderName;
    let nic = props.nic;
    let phone = props.phone;
    let type = props.type;
    let number = props.number;
    let email = props.email;

    let [data, setData] = useState({
        riderName: riderName,
        nic: nic,
        phone: phone,
        type: type,
        number: number,
        email: email
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setHelperText(' ');
        setData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }


    function onSubmit(e) {


        const RiderObject = {
            riderName: data.riderName,
            riderNic: data.nic,
            riderPhone: data.phone,
            vehicleType: data.type,
            vehicleNumber: data.number,
            email: data.email
        }

        axios.put(`http://localhost:8070/rider/update/${props.id}`, RiderObject)
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


    const handleSubmit = (event) => {
        event.preventDefault();

        if (riderName == '' && nic == '' && phone == '' && type == '' && number == '') {
            setHelperText('Please fill all the fields');

        } else if (riderName == '') {
            setHelperText('Please Enter Rider Name');

        } else if (email == '') {
            setHelperText('Please Enter Email');

        } else if (nic == '') {
            setHelperText('Please Enter NIC Number');

        } else if (phone == '') {
            setHelperText('Please Enter Mobile Number');

        } else if (number == '') {
            setHelperText('Please Enter Vehicle Number');

        } else if (type == '') {
            setHelperText('please Select Vehicle Type');
        }
        // } else if (phone.length < 10 || phone.length > 10) {
        //     setHelperText('please Enter Valid Phone Number');
        //
        // }
            else {
            onSubmit(event)
        }
    };


    return (
        <div>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Updated Successfully!
                </Alert>
            </Snackbar>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} className="form-background">
                    Update Rider
                    <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers className="form-background">

                        <div className="rider-form" style={{marginTop: '-60px'}}>


                            <div className="completion-text">
                                <TextField
                                    name="riderName"
                                    type='text'
                                    color="secondary"
                                    inputProps={{pattern: "[A-Za-z. ]{1,75}"}}
                                    label="Rider Name"
                                    placeholder="W.P. Kumara"
                                    value={data.riderName}
                                    onChange={handleChange}
                                    fullWidth/>
                            </div>

                            <div className="completion-text">
                                <TextField
                                    name='email'
                                    type='email'
                                    color="secondary"
                                    label="Rider Email"
                                    placeholder="abc@gmail.com"
                                    value={data.email}
                                    onChange={handleChange}
                                    fullWidth/>
                            </div>

                            <div className="completion-text">
                                <TextField
                                    name="nic"
                                    inputProps={{pattern: "[vV0-9 ]{1,10}"}}
                                    color="secondary"
                                    type='text'
                                    label="Rider NIC"
                                    placeholder="984511452V"
                                    value={data.nic}
                                    onChange={handleChange}
                                    fullWidth/>
                            </div>


                            <div className="completion-text">
                                <TextField
                                    name="phone"
                                    color="secondary"
                                    // inputProps={{pattern: "[0-9]{1,10}"}}
                                    type='number'
                                    label="Rider Phone"
                                    placeholder="0717845412"
                                    value={data.phone}
                                    onChange={handleChange}
                                    fullWidth

                                />
                            </div>


                            <div className="completion-text">
                                <TextField
                                    name="number"
                                    color="secondary"
                                    type='text'
                                    inputProps={{pattern: "[A-Za-z0-9- ]{1,75}"}}
                                    label="Vehicle Number"
                                    placeholder="PA-5684"
                                    value={data.number}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>

                            <div className="completion-text">
                                <TextField
                                    name="type"
                                    color="secondary"
                                    id="outlined-select-currency"
                                    type='select'
                                    select
                                    label="Select Vehicle Type"
                                    variant='outlined'
                                    value={data.type}
                                    onChange={handleChange}
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
                            Update
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}

