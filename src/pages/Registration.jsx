import "../components/css/registration.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../components/Context";
import { toast } from 'react-toastify';


const Registration = () => {

 const navigate = useNavigate();
const {storetoken} = useAuth();   

 const[regValue,setRegValue] = useState({
    name:"",
    phone:"",
    email:"",
    school:"",
    password:""
 })

 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegValue({...regValue,[name]:value});
 }

 const handleSubmit = async(e) => {
     e.preventDefault();
    try{

    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(regValue)
    });
    const res_data = await response.json();

    if(response.ok){

    storetoken(res_data.token);

      setRegValue({
         name:"",
         phone:"",
         email:"",
         school:"",
         password:""
        });

       toast.success(res_data.message);
       navigate("/admin");
    }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
    }

    }catch(err){
        console.log(err);
    }

 }

	return(
        <>
        	<section>
        	 <div className="registration_section">
                 <div className="registration_container">
        	 <h3 style={{textAlign : "center"}}>Registration</h3>
        	 <div className="registration">
        	  <div className="regis_img_container">
        	  <img src="images/registration1.jpg" alt="registration image" width="350" /> 	
        	  </div>
        	  <div className="regis_form">
        	  	<form onSubmit={handleSubmit}>
        	  	<div className="input_container">
        	  	<label htmlFor="name">Name:</label>
        	  	<input type="text" name="name" id="name" autoComplete="off" onChange={onChange} value={regValue.name}/>
        	  	</div>
        	  	<div className="input_container">
                <label htmlFor="phone">Phone:</label>
        	  	<input type="number" name="phone" id="phone" autoComplete="off" onChange={onChange} value={regValue.phone}/>
        	  	</div>
        	  	<div className="input_container">
                <label htmlFor="email">Email:</label>
        	  	<input type="text" name="email" id="email" autoComplete="off" onChange={onChange} value={regValue.email}/>
        	  	</div>
        	  	<div className="input_container">
                <label htmlFor="school">School:</label>
        	  	<input type="text" name="school" id="school" autoComplete="off" onChange={onChange} value={regValue.school}/>
        	  	</div>
        	  	<div className="input_container">
                <label htmlFor="password">Password:</label>
        	  	<input type="password" name="password" id="password" onChange={onChange} value={regValue.password}/>
        	  	</div>
        	  	<div className="submit_container">
        	  	<input type="submit" value="Register"/>
        	  	</div> 
             <p style={{paddingTop:"1rem",fontSize:"0.8rem"}}>Already have account ? 
             <span onClick={()=> navigate("/login")} style={{color:"blue",cursor:"pointer"}} >  signIn</span></p>                
        	  	</form>
        	  </div>
        	 
        	 </div>   		
        	 </div>   		
                 </div>                 
        	</section>
        </>

		)
}

export default Registration;