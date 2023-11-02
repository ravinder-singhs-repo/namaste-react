import ResturantCards from "./ResturantCards";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// reslist -> normal js array here 
// making it more powerful by giving it super powers and making it super powerful 
// we user a hook for it 



const Body = ()=>{

    const [listOfResturant,setListOfResturant] = useState([]);
 
    const[filteredRestaurant , setFilteredRes] = useState([]);

    const [searchText , setSearchText] = useState("")

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
          const restaurant_list = "restaurant_grid_listing";
          const resturantData = swiggyJsonData.data?.cards?.find((card)=>{
            return card.card?.card?.id===restaurant_list;
          })

          const resturantList = resturantData.card.card.gridElements.infoWithStyle.restaurants.map(res=>(
            res.info
          ));
          console.log(resturantList)
        setListOfResturant(resturantList) ;
        setFilteredRes(resturantList);
    }
    console.log('body rendered')
    console.log('List of restaurant',listOfResturant)
    console.log('Filtered List',filteredRestaurant)

    const onlineStatus = useOnlineStatus();
    if(onlineStatus===false){
      return (
        <h1>
          Looks like you're offline !! Please check your internet connection. 
        </h1>
      )
    }
    return listOfResturant.length=== 0 ? <Shimmer/> : (<div className='body'>
        
        <div className='filter'>

            <div className="search">
                <input type='text' className="search-box" value={searchText}
                onChange={(event)=>{
                    setSearchText(event.target.value);
                }}
                />
                <button
                onClick={()=>{
                    
                        const ListOfFilteredRestaurant = listOfResturant.filter((res)=>res.name.toLowerCase().includes(searchText.toLowerCase()));
                       setFilteredRes(ListOfFilteredRestaurant)
                    
                }}
                >Search</button>
            </div>

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
               filteredRestaurant.map((resturant)=> <Link to={'/restaurant/'+resturant.id}><ResturantCards 
               key={resturant.id}
               resData = {resturant}
               /></Link>)
               }
        </div>
 </div> 
           
    )
};
export default Body;