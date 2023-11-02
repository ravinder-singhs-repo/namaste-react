import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = ()=>{

    const {resId}  = useParams();

    const resInfo = useResturantMenu(resId); 

    if(resInfo===null)
    {
        return <Shimmer/>
    }

    console.log(resInfo)
    const{name ,cuisines, costForTwoMessage} = resInfo?.cards[0]?.card.card.info;
    const{itemCards} = resInfo?.cards[2]?.groupedCard.cardGroupMap.REGULAR.cards[2].card.card;   
    return (
            <div className="menu">
                <h1>{name}</h1>
                <h1>{cuisines.join(',')}</h1> 
                <h1>{costForTwoMessage}</h1>
                <h2>Menu</h2>
                <ul>
                    {itemCards.map(item=><li>{item.card.info.name} - Rs.{item.card.info.price/100 }</li> )}
                </ul>
            </div>
    )
    
};

export default RestaurantMenu;















