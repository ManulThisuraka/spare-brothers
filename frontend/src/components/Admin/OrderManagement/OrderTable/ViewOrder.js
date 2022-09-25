import React, {useEffect, useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import '../../../../styles/orderinfo.css'
import '../../../../styles/rider.css'
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

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

export default function ViewOrder(props) {


    const orderId = props.orderId

    const [open, setOpen] = React.useState(false);
    const [orderList, setOrderList] = useState([]);
    const [totals, setTotal] = useState(0);

    let city = 'kalluthra'

    const handleClickOpen = () => {
        setOpen(true);
        axios.get(`http://localhost:8070/order/view/${orderId}`)
            .then((response) => {
                console.log(response.data.city)
                setOrderList(response.data)

                let total = 0;
                response.data.map((data)=>{

                    console.log(data.itemPrice)

                    data.itemPrice.map(price=>{
                        total=total+parseFloat(price)
                    })



                   // data.itemPrice.map((data2,index)=>{
                   //     total= total + parseFloat(data2[index])
                   //     console.log(data2[index])
                   // })
                    setTotal(total);
                })


            })
            .catch((error) => {

            })

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

    let count = 0;
    let itemTotal=0;

    return (
        <div>
            <Button style={buttonStyle} onClick={handleClickOpen}>
                VIEW
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose} className="form-background">
                    Order Info
                </DialogTitle>
                <form>
                    <DialogContent dividers className="form-background" className='order-info'>


                        {
                            orderList.map((data, index) => {
                                return (
                                    <div>

                                        <div className="input-set">


                                            <div>
                                                <label style={{fontWeight: '600' }} >Customer Name :</label>
                                                <label style={{marginLeft: '5px' }}> {data.name}</label>

                                            </div>

                                            <div>
                                                <label style={{fontWeight: '600' }}>Address :</label>
                                                <label style={{marginLeft: '5px' }}> {data.city}</label>

                                            </div>


                                        </div>

                                        <div className="input-set">
                                            <div>
                                                <label style={{fontWeight: '600' }}>Order ID :</label>
                                                <label style={{marginLeft: '5px' }}>{data.orderId}</label>
                                            </div>

                                            <div>
                                                <label style={{fontWeight: '600' }}>Phone :</label>
                                                <label style={{marginLeft: '5px' }}> {data.phone}</label>
                                            </div>
                                        </div>

                                        <div className="input-set">
                                            <div>
                                                <label style={{fontWeight: '600' }}>Postal :</label>
                                                <label style={{marginLeft: '5px' }}> {data.postal}</label>
                                            </div>


                                        </div>


                                        <div className='order-form' style={{marginTop: '-60px'}}>

                                            <TableContainer component={Paper} style={{width: '350px'}}>
                                                <Table className={classes.table} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>

                                                            <StyledTableCell>Item No</StyledTableCell>
                                                            <StyledTableCell>Name</StyledTableCell>
                                                            <StyledTableCell>Price(Rs.)</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>


                                                        {
                                                            data.itemname.map((data2, index) => (


                                                                <TableRow>
                                                                    <TableCell>{count = count + 1}</TableCell>
                                                                    <TableCell>{data2}</TableCell>
                                                                    <TableCell >{data.itemPrice[index]}</TableCell>

                                                                </TableRow>


                                                            ))
                                                        }


                                                                <TableRow className='final-total'>
                                                                    <TableCell>Total</TableCell>
                                                                    <TableCell></TableCell>
                                                                    <TableCell>{totals}</TableCell>
                                                                </TableRow>




                                                    </TableBody>
                                                </Table>
                                            </TableContainer>


                                        </div>
                                    </div>
                                )
                            })
                        }

                    </DialogContent>

                    {/*<div className="input-set" style={{marginLeft: '20px', marginTop: '-50px'}}>*/}
                    {/*    <div>*/}
                    {/*        <label>Rider</label>*/}
                    {/*        <label> - Not Assigned</label>*/}
                    {/*    </div>*/}


                    {/*</div>*/}
                </form>


            </Dialog>


        </div>
    )
}