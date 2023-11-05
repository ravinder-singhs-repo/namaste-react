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
        
        <div className='flex '>

            <div className="m-4 p-4">
                <input type='text' className="border border-solid border-black rounded" value={searchText}
                onChange={(event)=>{
                    setSearchText(event.target.value);
                }}
                />
                <button className="px-4  py-0.5 m-3 bg-slate-200 rounded"
                onClick={()=>{
                    
                        const ListOfFilteredRestaurant = listOfResturant.filter((res)=>res.name.toLowerCase().includes(searchText.toLowerCase()));
                       setFilteredRes(ListOfFilteredRestaurant)
                    
                }}
                >Search</button>

                <button className="px-4 py-0.5 m-3 bg-slate-200 rounded"
                    onClick={()=>{
                      filteredList = listOfResturant.filter(resturant=>{
                          return resturant.avgRating>4;
                      })
                      setListOfResturant(filteredList);
                    }}
                >Top rated resturants</button>

            </div>

        </div>

        <div className='flex flex-wrap'>
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