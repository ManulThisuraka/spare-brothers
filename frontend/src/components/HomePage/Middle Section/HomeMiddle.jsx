import Button from '@material-ui/core/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
function HomeMiddle(){
    return(
        <div className="heroSection">
            <div className="row align-items-center justify-content-center">
                <div className="textSection" data-aos="fade-up" data-aos-duration="1000">
                    <p className="justify-content-center pStyle">
                    Get your all vehicle needs with <div className="offStyle">35% off</div> Order online - Stay Safe.
                    </p>
                    <Button className="contactButton" variant="contained" size="large" data-aos="fade-up" data-aos-duration="1000">Shop Now</Button>
                </div>
            </div>          
        </div>
    );
}

export default HomeMiddle;