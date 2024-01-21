import "../components/css/student_profile.css"
import Notice from "../components/Notice"
import {useAuth} from "../components/Context";
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const Student_profile = () => {
 
 const {user,loading} = useAuth();
 const navigate = useNavigate();

  useEffect(()=>{
     if(user.category==="admin"){
      return  navigate(-1);
     }else if(user.category==="teacher"){
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
         	   	  <p><span>Class:</span> {user.classname}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Roll:</span> {user.roll}</p>
                </div>
             <div>
         	   	  <p><span>Father's name:</span> {user.father}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Mother's name:</span> {user.mother}</p>
             </div>
             <div>
         	   	  <p><span>Email:</span> {user.email}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Fee:</span> {user.fee}</p>
                </div>
             <div>
         	   	  <p><span>Attendance:</span> {user.present}/{user.present + user.absent}</p>
         	   </div>
             </div>
         	 	
         	 </div> 
         	 <Notice/>
         	 </div> 
         
         	    		
         	</section>
         </>
		)
}

export default Student_profile;