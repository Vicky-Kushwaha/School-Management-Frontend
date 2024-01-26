import "../components/css/home.css"
import {Link} from "react-router-dom";
import {useAuth} from "../components/Context";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const Home = () => {
   
   const navigate = useNavigate();
   const {user,isLoggedIn} = useAuth();
 

     useEffect(()=>{
      if(isLoggedIn){ 
      switch(user.category){
        case "admin":
             navigate("/admin")
             break;
        case "teacher":
             navigate("/teacher_profile")
             break;
        case "student":
             navigate("/student_profile")
             break;          
      }
    }

     },[user])


	return(
        <>
        	<section>
        	<div className="home_container">
        	 <div className="image_container">
        	 	<img src="images/school1.jpg" alt="school image" height="300" width="400"/>
        	 </div>
        	 <div className="home_about">
        	 	<h3>welcome to <br/>school management system</h3>
        	 	<p><span>School Management System </span>is all <br/> in one  solution for educational institutes with different type of users.</p>
        	 	<p>Register here to use this app.</p>
        	 <div className="btn_container">
        	 	<Link to="/register"><button>Register</button></Link>
        	 	<Link to="/login"><button>Login</button></Link>
        	 </div>	
        	 </div>
             </div>
                		
        	</section>
        </>

		)
}

export default Home;