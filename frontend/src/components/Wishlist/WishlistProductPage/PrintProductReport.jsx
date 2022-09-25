import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { UilImport } from '@iconscout/react-unicons';
import {useEffect, useState} from "react";
import {map} from "react-bootstrap/ElementChildren";



export default function PrintProductReport(props) {

    const [products, setProducts] = useState();

    return(
        <div>
            <div className="red-square" style={{position:"relative", left:"25%"}} onClick={() =>{
                const doc = new jsPDF()
                autoTable(doc, {
                    head: [['Name', 'Email', 'Country']],
                    body: [
                        ['David', 'david@example.com', 'Sweden'],
                        ['Castille', 'castille@example.com', 'Spain'],
                    ],
                })
                doc.save('table.pdf')
            }}>

                <UilImport size={22} style={{position:"relative", right:"10%", top:"4%"}} />
            </div>
        </div>
    );
}