import NotificationIcon from '../../../../images/NotificationIcon.png';
import { UilCheck } from '@iconscout/react-unicons';
import axios from "axios";
export default function NotificationCard(props) {

    function deleteNotification(){
        axios.delete(`http://localhost:8070/notification/${props.id}`).then(()=>{
            props.closeProp();
        });

    }

    return(
        <div className="notification-card">

            <div className="notification-card-icon">
                <img src={NotificationIcon} />
            </div>
            <div className="notification-card-text">
                <h6>{props.product} restocked.</h6>
                <p>Your favourite {props.category} {props.product} restocked. You can buy it now.</p>
            </div>
            <div className="notification-card-button" onClick={deleteNotification}>
                <div className="red-square"><UilCheck style={{position:"relative", top:"5%", left:"5%"}} /></div>
            </div>

        </div>
    );
}