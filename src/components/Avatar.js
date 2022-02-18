import {  useState, useEffect } from "react";
import { useSelector, } from "react-redux";




const Avatar = () => {
    localStorage.getItem('userId');
         
    

    const avatarGet = useSelector((state) => state.auth.avatar);    
   
   const [avatarUrl, setAvatarUrl] = useState('') 
    

    useEffect(() => {
        setAvatarUrl(avatarGet.imagesAvatar[0].url)
        // eslint-disable-next-line
    }, [])



    return (  
        
        <div className="">
        <img
          src={avatarUrl}
          className="card-img-top"
          style={{width:'10rem'}}
          alt={avatarGet.filename}
        ></img>
      </div>

    )
}
 
export default Avatar;