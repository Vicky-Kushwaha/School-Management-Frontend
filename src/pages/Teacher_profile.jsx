import "../components/css/student_profile.css"
import Notice from "../components/Notice"
import {useAuth} from "../components/Context";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";

const Teacher_profile = () => {

const {user,loading} = useAuth();
const navigate = useNavigate();

  useEffect(()=>{
     if(user.category==="admin"){
      return  navigate(-1);
     }else if(user.category==="student"){
       return  navigate(-1);
     }
  },[loading]);


	return(
         <>
         	<section>
         	 <div className="student_profile_container">
         	 <div className="student_profile">
         	   <div className="profile_img">
         	   	<img src="images/boy.png" alt="student pic" width="150" height="150"/>
         	   </div>
               <div className="student_data">
         	   <div>
         	   	  <p><span>Name:</span> {user.name}</p>
               </div>
               <div>
         	   	  <p><span>Subject:</span> {user.subject}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Subject code:</span> {user.subjectcode}</p>
                </div>
               <div>     
         	   	  <p><span>Email:</span> {user.email}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Phone:</span> {user.phone}</p>
         	   </div> 
               </div>        	 	
         	 </div> 
         	 <Notice/>
         	 </div> 
        
         	    		
         	</section>
         </>
		)
}

export default Teacher_profile;