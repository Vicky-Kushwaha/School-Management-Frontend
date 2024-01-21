import "../components/css/admin.css";
import {useEffect} from "react";
import {useAuth} from "../components/Context";
import Notice from "../components/Notice"
import {useNavigate} from "react-router-dom";

const Admin = () => {

const {user,stud,teac,loading} = useAuth();

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
         <section className="admin_dashboard">
         <div className="admin_container">
         <div className="admin_access">
         <div className="total_info">
         	<h3>Total Students</h3>
         	<p>{ stud ? stud.length : 0}</p>
         </div>
         <div className="total_info">
         	<h3>Total Teachers</h3>
         	<p>{ teac ? teac.length :0}</p>         	
         </div>
         </div>
         <Notice/>
         </div>
         </section>
         </>
		)
}

export default Admin;