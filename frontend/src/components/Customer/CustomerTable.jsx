import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomerDelete from "./CustomerDelete/CustomerDelete";
import { UilSearch } from "@iconscout/react-unicons";
import {
    Card,
    Col,
    Container,
    Row,
    CardBody,
    Label,
    Input
} from 'reactstrap'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#5E4FA2',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}))(TableCell);



const useStyles = makeStyles({
    table: {
        minWidth: 200,
        backgroundColor: 'darkgray',
        color: '#ffffff',
    },
});



export default function CustomerTable() {
    let count = 0;
    const [getsearch, SetSearch] = useState("")
    const classes = useStyles();
    const [customerList, setCustomers] = useState([]);

    useEffect(() => {

        let config = {
            headers: {
              data:getsearch
            }
          }
    
        function getRiderList() {
            axios.get("http://localhost:8070/user/getAllCustomers" , config)
                .then((response) => {
                    setCustomers(response.data)
                    console.log(response.data)
                })
                .catch((error) => {
                    alert(error)
                })
        }

        getRiderList()
    }, [getsearch])

    return (
        <div>
            <Row className="mb-4-sm">
                <Col sm={9} className="mb-4-sm">
                </Col>
                <Col sm={3} className="mb-4-sm">
                    <Input
                        className="form-control-sm"
                        type="camel"
                        value={getsearch}
                        onChange={e => {
                            console.log(e.target.value)
                            SetSearch(e.target.value)
                        }}
                        placeholder="Search By Email"
                        style={{ textAlign: 'left' }}
                    />
                </Col>
                <div>
                </div>
            </Row>
            <br />
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>User Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            customerList.map(customer => (
                                <TableRow key={customer._id}>
                                    <TableCell>{count = count + 1}</TableCell>
                                    <TableCell>{customer.username}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>  <CustomerDelete customerID={customer._id} /></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

// import React , {useState} from 'react'
// import MaterialTable from 'material-table'

// export default function CustomerTable(){
//     const [tableData, setTableData] = useState([
//         {name:"A",email:"fafda@gmail",phone:147121510,age:null,gender:"M",city:"chennai",fee:78873},
//         {name:"B",email:"fsagf@gmail",phone:147121510,age:26,gender:"M",city:"chennai",fee:78873},
//         {name:"C",email:"etjba@gmail",phone:147121510,age:24,gender:"F",city:"chennai",fee:78873},
//         {name:"D",email:"lkjnljna@gmail",phone:147121510,age:33,gender:"F",city:"chennai",fee:78873},
//         {name:"E",email:"ounhpun@gmail",phone:147121510,age:33,gender:"F",city:"chennai",fee:78873},
//         {name:"G",email:"fkjm@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"F",email:"gdagkma@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"O",email:"gdahgada@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"L",email:"ehyfdbsda@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"W",email:"eojpona@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"S",email:"eo[ij0[@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"Q",email:"lkjnh@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"X",email:"iuhg98y@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"Z",email:"ouybvy@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"V",email:"p97hg@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"G",email:"foygtbv@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"R",email:"poiytf@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873},
//         {name:"T",email:"ljhg@gmail",phone:147121510,age:33,gender:"M",city:"chennai",fee:78873}
//     ])

// const column = [
//     {title:"Name",field:"name" , align:"left",filterPlaceholder:"Filter By Name"},
//     {title:"Email",field:"email" ,align:"left",filterPlaceholder:"Filter By Email"},
//     {title:"Phone Number",field:"phone" ,align:"left",filtering:false},
//     {title:"Age",field:"age",emptyValue:()=><em>null</em>,align:"left",filtering:false},
//     {title:"Gender",field:"gender",align:"left",lookup:{M:"Male",F:"Female"},filterPlaceholder:"Filter By Gender"},
//     {title:"City",field:"city",align:"left",filtering:false},
//     {title:"School Fee",field:"fee",align:"left",type:"currency",currencySetting:{currencyCode:"LKR"},filtering:false}
// ]

//     return(
//         <div className="App">
//             <MaterialTable columns={column} data={tableData} title={"My Information"} 
//             onSelectionChange={(row)=>console.log(row.map(e=>(console.log(e.name))))}
//             options={{filtering:true,pageSizeOptions:[2,5],pageSize:5,paginationType:"stepped",selection:true,showSelectAllCheckbox:false,showTextRowsSelected:false
//             }}/>

//         </div>
//     )

// }