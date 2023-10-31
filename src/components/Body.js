import ResturantCards from "./ResturantCards";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// reslist -> normal js array here 
// making it more powerful by giving it super powers and making it super powerful 
// we user a hook for it 



const Body = ()=>{

    // usestate hook 
    // local state variable - super powerful variable 
    // it has scope inside the component only 
    // it can be modified in a function only , which is the second parameter in useState
    const [listOfResturant,setListOfResturant] = useState([]);

    //for filtering 
    const[filteredRestaurant , setFilteredRes] = useState([]);

    const [searchText , setSearchText] = useState("")
    

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
          const restaurant_list = "restaurant_grid_listing";
          const resturantData = swiggyJsonData.data?.cards?.find((card)=>{
            return card.card?.card?.id===restaurant_list;
          })
        //   console.log(resturantData);
        //   console.log(resturantData.card.card.gridElements.infoWithStyle.restaurants);
          const resturantList = resturantData.card.card.gridElements.infoWithStyle.restaurants.map(res=>(
            res.info
          ));
          console.log(resturantList)
        // console.log(swiggyJsonData.data?.cards);
        setListOfResturant(resturantList) ;
        setFilteredRes(resturantList);
    }
    console.log('body rendered')
    console.log('List of restaurant',listOfResturant)
    console.log('Filtered List',filteredRestaurant)
    // conditional rendering
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
                    // if(searchText.length!=0){
                        // console.log(dummylist);
                        const ListOfFilteredRestaurant = listOfResturant.filter((res)=>res.name.toLowerCase().includes(searchText.toLowerCase()));

                        // console.log(ListOfFilteredRestaurant)
                        // if(filteredRestaurant!=0)
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