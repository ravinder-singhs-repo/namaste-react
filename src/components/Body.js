import ResturantCards from "./ResturantCards";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";

// reslist -> normal js array here 
// making it more powerful by giving it super powers and making it super powerful 
// we user a hook for it 



const Body = ()=>{

    // usestate hook 
    // local state variable - super powerful variable 
    // it has scope inside the component only 
    // it can be modified in a function only , which is the second parameter in useState
    let [listOfResturant,setListOfResturant] = useState([]);

    // useEffect Hook 
    useEffect(()=>{
        console.log('UseEffect called');
        fetchData();
    },[])

    async function fetchData(){
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
          );
          const swiggyJsonData = await data.json();
          console.log(swiggyJsonData)
          const restaurant_list = "top_brands_for_you";
          const resturantData = swiggyJsonData.data?.cards?.find((card)=>{
            return card.card?.card?.id===restaurant_list;
          })
        //   console.log(resturantData);
        //   console.log(resturantData.card.card.gridElements.infoWithStyle.restaurants);
          const resturantList = resturantData.card.card.gridElements.infoWithStyle.restaurants.map(res=>(
            res.info
          ));
        //   console.log(resturantList)
        // console.log(swiggyJsonData.data?.cards);
        setListOfResturant(resturantList) 
    }

    if(listOfResturant===0){
        return< h1>Loading...</h1>
    }

    return(
           <div className='body'>
                  <div className='filter'>
                      <button className="filter-btn"
                      onClick={()=>{
                        filteredList = listOfResturant.filter(resturant=>{
                            return resturant.data.avgRating>4;
                        })
                        setListOfResturant(filteredList);
                      }}
                      >Top rated resturants</button>
                  </div>
                  <div className='res-container'>
                         {
                         listOfResturant.map((resturant)=><ResturantCards 
                         key={resturant.id}
                         resData = {resturant}
                         />)
                         }
                  </div>
           </div>
    )
};
export default Body;