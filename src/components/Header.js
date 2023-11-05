import { useState , useEffect } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = ()=>{
       const[btnName , setBtnName] = useState('Login')
       console.log("Header Rendered")

       // UseEffect
       // no dependency -> useEffect called on every rendered
       //
       useEffect(()=>{
              console.log('UseEffect in header Called');
       },[btnName])

       const onlineStatus = useOnlineStatus();
    return(
           <div className='flex justify-between'>
                  <div className='logo-container'>
                         <img className ='w-40' src={LOGO_URL}></img>
                  </div>

                  <div className='flex items-center'>
                         <ul className="flex p-4 m-4">
                                <li className="px-4">Online Status:{onlineStatus===true?'🟢':'🔴'}</li>
                                <li className="px-4"><Link to='/'> Home</Link> </li>
                                <li className="px-4"><Link to='/about'> About Us</Link></li>
                                <li className="px-4"><Link to='/contact'> Contact Us</Link></li>
                                <li className="px-4"><Link to='/grocery'>Grocery</Link></li>
                                <li className="px-4"> Cart</li>
                                <button className="login"
                                onClick={
                                   ()=>{
                                          btnName==='Login'?
                                          setBtnName('Logout'):setBtnName('Login');
                                   }
                                 
                                  }

                                >{btnName}</button>
                         </ul>
                  </div>
           </div>
    )
}

export default Header;

