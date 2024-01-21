import "../components/css/login.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/Context";
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';


const Login = () => {

 const {storetoken} = useAuth();

 const [progress, setProgress] = useState(0);
 const[loginValue,setLoginValue,userAuthentication] = useState({
    email:"",
    category:"",
    password:""
 });


 const navigate = useNavigate();    

 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginValue({...loginValue,[name]:value});
 }

 const handleSubmit = async(e) => {
     e.preventDefault(); 
      setProgress(20);
   try{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginValue)
    });
      setProgress(40);
    const res_data = await response.json();

    if(response.ok){

    storetoken(res_data.token);
    setLoginValue({
       email:"",
       category:"",
       password:""
        });
     
     toast.success(res_data.message); 
     if(loginValue.category === "admin"){
     navigate("/admin"); 
     }else if(loginValue.category === "student"){
     navigate("/student_profile"); 
     } if(loginValue.category === "teacher"){
     navigate("/teacher_profile"); 
     }
     
    setProgress(80); 

    }else{
      toast.error(res_data.message || "Login failed");
    }

    setProgress(100);

   }catch(err){
      console.log(err);
   } 

 }

	return(
        <>
        	<section>
           <LoadingBar color='red' progress={progress} />
        	 <div className="registration_section">
            <div className="registration_container">
        	 <h3 style={{textAlign : "center"}}>Login</h3>
        	 <div className="registration">
        	  <div className="regis_img_container">
        	  <img src="images/login1.jpg" alt="registration image" width="250" /> 	
        	  </div>
        	  <div className="regis_form" style={{padding: "1rem"}}>
        	  <form onSubmit={handleSubmit} >
        	<div className="input_container">
                <label htmlFor="email">Email:</label>
        	<input type="text" name="email" id="email" autoComplete="off" onChange={onChange}/>
        	</div>
        	<div className="category" style={{padding: "0.8rem"}}>
                <label htmlFor="admin">Admin:</label>
                <input type="radio" name="category" id="admin" value="admin" onChange={onChange}/>
                <label htmlFor="teacher">Teacher:</label>
                <input type="radio" name="category" id="teacher" value="teacher" onChange={onChange}/>
                <label htmlFor="student">Student:</label>
                <input type="radio" name="category" id="student" value="student" onChange={onChange}/>
        	</div>
        	<div className="input_container">
                <label htmlFor="password">Password:</label>
        	<input type="password" name="password" id="password" onChange={onChange}/>
        	</div>
        	<div>
        	<input type="submit" value="Login"/>
        	</div> 
             <p style={{paddingTop:"1rem",fontSize:"0.8rem"}}>Don't have account ? 
             <span onClick={()=> navigate("/register")} style={{color:"blue",cursor:"pointer"}} >  signUp</span></p>
        	</form>
        	  </div>
        	 
        	 </div>   		
        	 </div>   		
                 </div>                 
        	</section>
        </>

		)
}

export default Login;