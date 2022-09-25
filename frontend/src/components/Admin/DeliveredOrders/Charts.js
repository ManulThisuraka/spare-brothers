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
import {
    AppBar,
    DialogContent,
    DialogTitle,
    FormHelperText,
    Slide,
    Toolbar,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import OrderReport from "./OrderReport";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function (props) {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>


            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View Annual Report
            </Button>
            <Dialog
                fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div className="container" style={{width: "850px"}}>

                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Annual Report 2021
                            </Typography>

                        </Toolbar>
                    </AppBar>

                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                         Delivered Orders Annual Report
                    </DialogTitle>

                    <DialogContent>

                        <OrderReport/>

                    </DialogContent>

                </div>

            </Dialog>
        </div>
    )
}

