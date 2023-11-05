import { CDN_URL } from "../utils/constants";


const ResturantCards = (props)=>{
    const {resData} = props;
    const {
           name,
           cuisines,
           costForTwo,
           avgRating,
           cloudinaryImageId
          } = resData;
    
    return(
           <div className='m-4 p-4 w-[220px] rounded bg-gray-100 hover:bg-gray-200' >
                  <img 
                  className='res-logo rounded-sm '
                  src={CDN_URL+ resData.cloudinaryImageId} 
                  alt='dish photo'/>
                  <h3 className="font-bold py-4 text-lg">{name}</h3>
                  <h4>{cuisines.join(",")}</h4>
                  <h4>{costForTwo.split(' ')[0]} for Two</h4>
                  <h4>{avgRating}</h4>
           </div>
    )
};
export default ResturantCards;