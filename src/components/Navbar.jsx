import "./css/navbar.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from "./Context";
import {Link} from "react-router-dom"
import {useState,useEffect} from "react"

const Navbar = () => {


const {sidebar,showSidebar,hideSidebar,user,stud,teac,isLoggedIn,userAuthentication} = useAuth();
const[noticeModal,setNoticeModal] = useState(false); 
const[notice,setNotice] = useState({
     noticedata:"",
     adminemail: user.email,
       });

 const noticeModalShow = () => {
  setNoticeModal(true);
  hideSidebar();
 }

  const noticeModalHide = () => {
  setNoticeModal(false);
 }

useEffect(()=>{
   setNotice({
    noticedata:"",
    adminemail: user.email,
   })
 },[user]);

const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNotice({...notice,[name]:value});
 }

  const handleSubmit = async(e) => {
     e.preventDefault(); 
       try{
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/notices`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notice)
    }); 

    const res_data = await response.json();

    if(response.ok){
      noticeModalHide();
      userAuthentication();
        }else{
            alert(res_data)
          } 
    }catch(error){
        console.log(error);
    }   
 }
 

	return(
          <>
           <div className="nav_container">
           	<div className="logo_container">
              {(isLoggedIn) &&
               (<KeyboardDoubleArrowRightIcon style={{cursor:"pointer"}} onClick={showSidebar} />)
                }
           		<img src="images/school_logo2.png" alt="school logo" height="40" width="80"/>
                <h3>School Management System</h3>
           	</div> 
             </div>

             
         { sidebar &&
         <div className="sidebar">
           <div className=" hidesidebar">
              <KeyboardDoubleArrowLeftIcon onClick={hideSidebar}/>
           </div> 

           { (user.category === "admin" || user.category === "teacher")  && 
             <> 
           {  (user.category === "admin" ) &&
           <>
           <div className="sidebar_link">
              <Link className="link" to="/admin" onClick={hideSidebar} >Dashboard</Link>
           </div>
           <div className="sidebar_link">
              <Link className="link" to="/admin_profile" onClick={hideSidebar} >Profile</Link>
           </div>             </> }          
           <div className="sidebar_link">
              <Link className="link" to="/student" onClick={hideSidebar} >Student</Link>
           </div>
           { (user.category === "admin") && (
           <div className="sidebar_link">
              <Link className="link" to="/teacher" onClick={hideSidebar} >Teacher</Link>
           </div>) }
           {  (user.category === "admin" ) && 
           <div className="sidebar_link">
              <Link className="link" onClick={noticeModalShow}>Notice</Link>
           </div>  }
                 </>}
        
           <div className="sidebar_link">
              <Link className="link" to="/logout" onClick={hideSidebar} >Logout</Link>
           </div>                                                                   
         </div> } 


             { noticeModal  && 
            <div className="modal">
               <div className="form_container">
                <CloseIcon  onClick={noticeModalHide} className="cutIcon" />
              <form onSubmit={handleSubmit} >
                <div className="heading_container">
                  <h3>Notice</h3>
              </div>              
              
                <div className="notice_input" >
              <input type="text" name="noticedata" id="notice" autoComplete="off" onChange={onChange}/>
              </div>
          
              <div className="submit_container">
               <input type="submit" value="Add"/>
              </div>
              </form>
               </div>
            </div>  }  
                    </>
		)
}

export default Navbar;