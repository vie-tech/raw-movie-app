import React from "react"
import { FaHeart } from 'react-icons/fa';


export  default function MovieCards(props){
    return(
        <>
       <div className="movie-card">
        <img src={props.img} alt="No poster available"  onClick={()=> props.handleClick(props.movie)}/>
        <div className="overlay"> <span className="favouriteText">Add to favourite</span>  <FaHeart color="red" /></div>
         </div> 
        </>
    )
}