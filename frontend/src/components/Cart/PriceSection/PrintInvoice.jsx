import Button from '@material-ui/core/Button';
import { UilImport } from '@iconscout/react-unicons';
import jsPDF from "jspdf";

const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '100px',
    boxShadow: '0px 0px 3px #FA334E',
    textTransform: 'capitalize'
}

export default function PrintInvoice(props){

    const title = "Payment Invoice";
    const cartTotal = "Cart total: Rs."+props.cartTotal;
    const totDiscount = "Discount: Rs."+props.totDiscount;
    const deliveryFee = "Delivery fee: Rs."+Math.floor(props.deliveryFee).toFixed(2);
    const totalFee = "Total : Rs."+props.totalFee;

    function generateInvoice(){
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text(title, 80, 10);
        doc.setFontSize(12);
        doc.text(cartTotal, 10, 20);
        doc.text(totDiscount, 10, 25);
        doc.text(deliveryFee, 10, 30);
        doc.setFontSize(18);
        doc.text(totalFee, 10, 40);
        doc.save("cart invoice.pdf");
    }
    return(
        <div>
            <Button style={buttonStyle} onClick={generateInvoice}>Invoice <UilImport /></Button>
        </div>
    );
}