import { useEffect, useState } from "react";

const useOnlineStatus = ()=>{
    const[onlineStatus , setStatus] = useState(true);

    //check if online 
    useEffect(()=>{
        window.addEventListener('offline',()=>{
            setStatus(false);
        });
    },[])
    useEffect(()=>{
        window.addEventListener('online',()=>{
            setStatus(true);
        });
    },[])

    // return status -> boolean value 
    return onlineStatus;
}
export default useOnlineStatus;