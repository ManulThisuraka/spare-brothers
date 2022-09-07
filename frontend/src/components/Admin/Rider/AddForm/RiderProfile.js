import React, {useEffect, useState} from "react";
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


const buttonStyle = {
    backgroundColor: "#098d36",
    color: "#fafafa",

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function RiderProfile(props) {

    let id = props.id;
    let email = props.email;


    const [uname, setUname] = React.useState('');
    useEffect(()=>{


        function getUser() {
            axios.get(`http://localhost:8070/user/getOne/${props.id}`)
                .then((response) => {
                        setUname(response.data.username)
                    console.log(response.data.username)
                })
                .catch((error) => {
                    alert(error)
                })

        }

        getUser()
    },[])







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




    const [openSnack, setOpenSnack] = React.useState(false);
    //snack Bar
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };





    let [data, setData] = useState({
      //  id:id,
        username: '',
        email: email,
        password: '',


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


        const LoginObject = {

            username: data.username,
            email: data.email,
            password: data.password,
            userType:'rider',
            riders:props.id

        }

        axios.post(`http://localhost:8070/user/register`, LoginObject)
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


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //
    //     if (data.riderName == '' && data.nic == '' && data.phone == ''&& data.type == ''&& data.number == '') {
    //         setHelperText('please fill all the fields');
    //
    //     } else if (data.riderName == '') {
    //         setHelperText('please Enter Rider Name');
    //
    //     } else if (data.nic == '') {
    //         setHelperText('please Enter NIC Number');
    //
    //     }  else if (data.phone == '') {
    //         setHelperText('please Enter Mobile Number');
    //
    //     } else if (data.number == '') {
    //         setHelperText('please Enter Vehicle Number');
    //
    //     } else if (data.type == '') {
    //         setHelperText('please Select Vehicle Type');
    //
    //     }else {
    //         onSubmit(event)
    //     }
    // };



    return (
        <div>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success">
                    Updated Successfully!
                </Alert>
            </Snackbar>
            <button  disabled={uname!=null} class="btn btn-success" style={{color:'white'}} onClick={handleClickOpen}>
                Add Profile
            </button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} className="form-background">
                    Add Login Profile
                </DialogTitle>
                <form onSubmit={onSubmit}>
                    <DialogContent dividers className="form-background">

                        <div className="rider-profile" style={{marginTop: '-60px'}}>


                            <div className="completion-text">
                                <TextField
                                    autocomplete="off"
                                    name="username"
                                    type='text'
                                    color="secondary"
                                    inputProps={{pattern: "[A-Za-z. ]{1,75}"}}
                                    label="User Name"
                                    placeholder="kumara"
                                    onChange={handleChange}
                                    fullWidth/>
                            </div>


                            <div className="completion-text">
                                <TextField
                                    name="email"
                                    color="secondary"
                                    type='email'
                                    label="Email"
                                    contentEditable={false}
                                    value={props.email}
                                    placeholder="abc@gmail.com"
                                    onChange={handleChange}
                                    fullWidth/>
                            </div>


                            <div className="completion-text">
                                <TextField
                                    name="password"
                                    color="secondary"
                                    type='password'
                                    label="Password"
                                    onChange={handleChange}
                                    fullWidth

                                />
                            </div>


                            <FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>

                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            Add Profile
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}

