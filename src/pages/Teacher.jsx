import "../components/css/student.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from "../components/Context";
import {useState,useEffect} from "react";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const Teacher = () => {

 const {user,teac,userAuthentication,loading} = useAuth();

 const navigate = useNavigate();

 useEffect(()=>{
     if(user.category==="student"){
      return  navigate(-1);
     }else if(user.category==="teacher"){
      return  navigate(-1);
     }
  },[loading]);

 const [progress, setProgress] = useState(0);
 const[modal,setModal] = useState(false);
 const[teacherModal,setTeacherModal] = useState(false);
 const[editModal,setEditModal] = useState(false);
 const [selectedTeacher, setSelectedTeacher] = useState(null);
 const[filterTeacher,setFilterTeacher] = useState(teac);
 const[teacData,setTeacData] = useState({
   name:"",
   subject:"",
   subjectcode:"",
   email:"",
   phone:"",
   password:"",
   adminemail: user.email,
 });

 useEffect(() => {
    setTeacData({
      name: "",
      subject: "",
      subjectcode: "",
      email: "",
      phone: "",
      password: "",
      adminemail: user.email, // Now user is available
    });
  }, [user]);

 useEffect(()=>{
    setFilterTeacher(teac);
 },[teac]);

 const modalShow = () => {
 	setModal(true);
 }

 const teacModal = (elem) => {
    setSelectedTeacher(elem);
    setTeacherModal(true);
 } 


 const editShow = (elem) => {
    // Set the currently selected student's data when the "Edit" button is clicked
    setSelectedTeacher(elem);
    setEditModal(true);
  };


  const modalHide = () => {  
    modal ? setModal(false): setEditModal(false) 
 }

  const filter = (e) => {
     const name = e.target.value
     if(name.length > 0){
    const newTeacher = teac.filter((elem)=>{
        return (elem.name === name) 
    });

   if(newTeacher.length > 0){
    setFilterTeacher(newTeacher);
    } }else{
        setFilterTeacher(teac);
    }

 }


 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
   if(modal){
    setTeacData({...teacData,[name]:value});
     }else{
    setSelectedTeacher({...selectedTeacher,[name]:value});
}
 }


 const handleSubmit = async(e) => {
     e.preventDefault();
     setProgress(20);
    try{
      if(modal){
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/teacher`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teacData)
    });

    const res_data = await response.json();
     setProgress(40);
    if(response.ok){

    toast.success(res_data.message);

    setTeacData({
       name:"",
       subject:"",
       subjectcode:"",
       email:"",
       phone:"",
       password:"",
       adminemail: user.email,
     });

      setModal(false);
      setProgress(80);
      userAuthentication();
   }else{
     toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message );
   } 


} else{

const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/teacher/${selectedTeacher._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedTeacher)
    });

  const res_data = await response.json();
   setProgress(40); 

    if(response.ok){
      toast.success(res_data.message);    
      setEditModal(false);
      setProgress(80);
      userAuthentication();
      }
   }

    setProgress(100);
    }catch(err){
        console.log(err);
    }
 }


 const del = async(elem) => {
    try{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/teacher/${elem._id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        
          });

    if(response.ok){
       userAuthentication();
       toast.success("Teacher deleted successfully");
     }

     }catch(error){
         console.log(error)
            }
  }

	return(
         <>
         	<section>
            <LoadingBar color='red' progress={progress} />
         	 <div className="student_container">
         	  <div className="info_box">
         	  <div className="search_box">
         	  	 <input type="text" name="search" placeholder="search teacher by name" onChange={filter}/>
         	  </div>
         	  <div className="student_box">
               {Array.isArray(filterTeacher) && filterTeacher.length > 0 ? (
                <table cellSpacing="0">
                  <thead>
                        <tr className="table_heading">
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Subject code</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                     </thead>
                 {  filterTeacher.map((elem, id) => (

                     <tbody className="student_info" key={id}>
         	  	 		<tr className="table_data">
         	  	 			<td>{elem.name}</td>
         	  	 			<td>{elem.subject}</td>
         	  	 			<td>{elem.subjectcode}</td>
         	  	 			<td>{elem.email}</td>
         	  	 			<td>{elem.phone}</td>
                     <td className="action">
                        <div><VisibilityIcon onClick={()=> teacModal(elem)} /></div>
                        <div><EditIcon onClick={() => editShow(elem)} /></div>
                        <div><DeleteIcon onClick={() => del(elem)}/></div>
                     </td>                             
         	  	 		</tr> 
                     </tbody>      	  	 		
         	  	 	
                 )) }
                  </table> 
                       ) : (
                               <p style={{textAlign:"center"}}>No teachers available</p>
                             )}
         	  </div> 
           	  <div className="search_box">
         	  	<button className="add_student" onClick={modalShow}>Add teacher</button>
         	  </div>        	  
         	  </div> 
                  { (modal || editModal) && 
              <div className="modal">
                 <div className="form_container">
                  <CloseIcon  onClick={modalHide} className="cutIcon" />
                <form onSubmit={handleSubmit} >
                <div className="heading_container">
                 { editModal ? <h3>{selectedTeacher.name}</h3> : <h3>Teacher Registration</h3> }
                </div>              
                <div className="student_input">
                <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.name : teacData.name} />
                </div>
                <div>
                <label htmlFor="subject">Subject:</label>
                <input type="text" name="subject" id="subject" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.subject : teacData.subject} />
                </div>
                </div>
                <div className="student_input">
                <div>
                <label htmlFor="subjectcode">Subject code:</label>
                <input type="text" name="subjectcode" id="subjectcode" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.subjectcode : teacData.subjectcode} />
                </div>
               <div>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.email : teacData.email} />
            </div>
                </div>
                <div className="student_input">
                <div>
                <label htmlFor="phone">Phone:</label>
                <input type="number" name="phone" id="phone" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.phone : teacData.phone} />
                </div>
                { modal &&
                <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" autoComplete="off" onChange={onChange} value={editModal ? selectedTeacher.password : teacData.password} />
                </div> }
                </div>
                <div className="submit_container">
                   { editModal ? <input type="submit" value="Edit"/> : <input type="submit" value="Register"/> }
                </div>
                </form>
                 </div>
              </div>  }

             { teacherModal &&
            <div className="modal"> 
            <div className="student_profile" style={{backgroundColor:"white",position:"relative"}}>
             <CloseIcon  onClick={()=>setTeacherModal(false)} className="cutIcon" />         
               <div className="profile_img">
                <img src="images/boy.png" alt="student pic" width="150" height="150"/>
               </div>
               <div className="student_data">
               <div>
                  <p><span>Name:</span> {selectedTeacher.name}</p>
               </div>
               <div>   
                  <p><span>Subject:</span> {selectedTeacher.subject}</p>
               </div>
               <div>
                  <p><span>Subject code:</span> {selectedTeacher.subjectcode}</p>
               </div>
               <div>   
                  <p><span>Email:</span> {selectedTeacher.email}</p>
               </div>
               <div>
                  <p><span>Phone:</span> {selectedTeacher.phone}</p>
               </div>              
               </div>              
             </div> 
                  </div>    
                   }          
         	    	  
         	 </div>		
         	</section>
         </>
		)
}

export default Teacher;