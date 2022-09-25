import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import jsPDF from "jspdf";
import axios from "axios";
import 'jspdf-autotable'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {deepOrangeA100} from "material-ui/styles/colors";
// const _ = require('underscore-contrib');
// const {indexBy} = require("underscore");


export default function OrderReport(props) {


    const [completeList, setCompleteList] = useState([]);
    const [details, setDetails] = useState([]);
    let dataMonth = []

    useEffect(() => {

        axios.get(`http://localhost:8070/complete/by-month/`)
            .then((response) => {
                //  dataMonth=response.data
                setDetails(response.data)
                //console.log(response.data)
                //console.log(dataMonth)
            })
            .catch((error) => {
                alert(error)
            })


    }, [])


    details.sort(function (x, y) {
        return x.index - y.index;
    });


    console.log(details)


    //
    // const data = [
    //     {
    //         label: 'Page A',
    //
    //         value: 0,
    //
    //     },
    //     {
    //         label: 'Page B',
    //         value: 0,
    //
    //     },
    //     {
    //         label: 'Page C',
    //
    //         value: 0,
    //
    //     },
    //     {
    //         label: 'Page D',
    //
    //         value: 0,
    //
    //     },
    //     {
    //         label: 'Page E',
    //
    //         value: 2,
    //
    //     },
    //     {
    //         label: 'Page F',
    //
    //         value: 0,
    //
    //     },
    //     {
    //         label: 'Page G',
    //
    //         value: 0,
    //
    //     },
    // ];

    return (
        <div style={{height: "220px", width: "700px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={1200}
                    height={200}
                    data={details}
                    margin={{
                        top: 12,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="label"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <br></br>
                    <Bar dataKey="value" fill="#8884d8"/>

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}