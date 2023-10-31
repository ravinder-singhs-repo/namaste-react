import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = ()=>{
    const[resInfo , setResInfo] = useState(null);
    const {resId}  =useParams();

    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu= async()=>{
        const data = await fetch('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId='+resId+'&catalog_qa=undefined&submitAction=ENTER');
        //10208
        const jsonData = await data.json();
        // console.log(jsonData)
        console.log('itemcards',jsonData.data?.cards[2]?.groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards)
        // console.log(jsonData.data?.cards[0]?.card.card.info.name)
        setResInfo(jsonData);
    }

    if(resInfo===null)
    {
        return <Shimmer/>
    }

    const{name ,cuisines, costForTwoMessage} = resInfo?.data?.cards[0]?.card.card.info;
    const{itemCards} = resInfo?.data?.cards[2]?.groupedCard.cardGroupMap.REGULAR.cards[1].card.card;
    // console.log(itemCards)    
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















