import {UilSearch} from "@iconscout/react-unicons";
import {useState} from "react";

export default function SearchIcon(props) {

    const [searchTerm, setSearchTerm] = useState();
    props.buttonPressed(searchTerm)


    return(
        <div className="search-box">
            <input type="text" name="" className="search-txt" placeholder="Search..." onChange={(event)=>{
                setSearchTerm(event.target.value);
            }} />
            <a className="search-button" >
                <UilSearch color="#B7B6B6"/>
            </a>
        </div>
    );
}