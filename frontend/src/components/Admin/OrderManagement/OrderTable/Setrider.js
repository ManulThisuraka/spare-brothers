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
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import '../../../../styles/wishlist.css'

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

export default function Setrider(props){


    const [riderList,setRiderList] = useState([]);
    const [type, setType] = useState("");

    useEffect(()=>{

        function getRiderList() {
            axios.get("http://localhost:8070/rider/getAllRiders")
                .then((response) => {
                    let data=[]
                    response.data.data.map((item,index)=>{
                        let category ={
                            value:item._id,
                            label:item.riderName
                        }
                        data.push(category)
                    })

                    setRiderList(data)
                    console.log(response.data)
                })
                .catch((error) => {
                    alert(error)
                })

        }

        getRiderList()
    },[])


    const riderChange = (event) => {
        setType(event.target.value);
    }



    const [open, setOpen] = React.useState(false);

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


    function onSubmit(e) {


        const RiderAssignObject = {
            request: "pending",
            riders: type ,

        }

        axios.put(`http://localhost:8070/order/update/${props.id}`, RiderAssignObject)
            .then((res) => {
              alert("updated")

            })
            .catch(error => {
                alert(error)
            })
    }



    return(
        <div>
            <Button disabled={props.state=='pending' || props.state=='Accepted'|| props.state=='Completed'} variant="contained" color="secondary" onClick={handleClickOpen}>
                SET
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} className="form-background">
                   Assign Rider
                </DialogTitle>
                <form onSubmit={onSubmit}>
                    <DialogContent dividers>
                        <Typography >


                            <TextField
                                name="type"
                                className={classes.textField}
                                required
                                id="outlined-select-currency"
                                label="Select Rider"
                                margin="dense"
                                variant="outlined"
                                select
                                onChange={riderChange}
                            >
                                {riderList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="secondary">
                            Submit
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}