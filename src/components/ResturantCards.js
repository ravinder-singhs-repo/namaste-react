import { CDN_URL } from "../utils/constants";

const styleCard = {
    backgroundColor: '#f0f0f0'
};

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
           <div className='res-card' style={styleCard}>
                  <img 
                  className='res-logo'
                  src={CDN_URL+ resData.cloudinaryImageId} 
                  alt='dish photo'/>
                  <h3>{name}</h3>
                  <h4>{cuisines.join(",")}</h4>
                  <h4>{costForTwo.split(' ')[0]} for Two</h4>
                  <h4>{avgRating}</h4>
           </div>
    )
};
export default ResturantCards;