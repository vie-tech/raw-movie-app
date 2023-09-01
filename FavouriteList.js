import React from "react"
import { FaHeart } from 'react-icons/fa';

export default function FavouriteList(props){


    return(
        <>
    
        <div className="favourite-card">
        <img src={props.img} alt="" onClick={()=> props.handleClick2(props.movie)}/>
        <div className="non-overlay"> <span className="non-favouriteText">Remove From favourite</span>  <FaHeart color="red" /></div>
 
        </div>
        
        </>
    )
}
