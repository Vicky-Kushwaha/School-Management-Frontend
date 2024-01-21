import "../components/css/student_profile.css"
import {useAuth} from "../components/Context";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Admin_profile = () => {
 
 const {user,loading} = useAuth();
 const navigate = useNavigate();

   useEffect(()=>{
     if(user.category==="student"){
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
         	   	  <p><span>Email:</span> {user.email}</p>
         	   </div>
         	   <div>
         	   	  <p><span>Phone:</span> {user.phone}</p>
         	   </div>
         	   <div>
	           	  <p><span>School:</span> {user.school}</p>
         	   </div>
         	 </div>    		
         	 </div>    		
         	 </div>    		
         	</section>
         </>
		)
}

export default Admin_profile;