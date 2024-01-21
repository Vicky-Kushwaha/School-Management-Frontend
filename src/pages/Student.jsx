import "../components/css/student.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import {useState,useEffect} from "react";
import {useAuth} from "../components/Context";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const Student = () => {
   
 const {user,stud,userAuthentication,loading} = useAuth();
  const [progress, setProgress] = useState(0);

 const navigate = useNavigate();

useEffect(()=>{
     if(user.category==="student"){
      return  navigate(-1);
     }
  },[loading]);
  

 const[modal,setModal] = useState(false);
 const[studentModal,setStudentModal] = useState(false);
 const[attendanceModal,setAttendanceModal] = useState(false);
 const[attendance,setAttendance] = useState(null);
 const[studentAttendance,setStudentAttendance] = useState(null);
 const[editModal,setEditModal] = useState(false);
 const [selectedStudent, setSelectedStudent] = useState(null);
 const[filterStudent,setFilterStudent] = useState(stud);
 const[stuData,setStuData] = useState({
   name:"",
   classname:"",
   roll:"",
   father:"",
   mother:"",
   phone:"",
   email:"",
   password:"",
   adminemail: user.email,
   fee: "0",
 });

 useEffect(() => {
    setStuData({
   name:"",
   classname:"",
   roll:"",
   father:"",
   mother:"",
   phone:"",
   email:"",
   password:"",
   adminemail: user.email,
   fee: "0",
    });
  }, [user]);


 useEffect(()=>{
    setFilterStudent(stud)
},[stud]);


 const modalShow = () => {
 	setModal(true);
 }

 const editShow = (elem) => {
    // Set the currently selected student's data when the "Edit" button is clicked
    setSelectedStudent(elem);
    setEditModal(true);
  };

 const studModal = (elem) => {
    setSelectedStudent(elem);
    setStudentModal(true);
 } 

 const filter = (e) => {
     const classname = e.target.value
     if(classname > 0){
    const newStudent = stud.filter((elem)=>{
        return (elem.classname == classname) 
    });

   if(newStudent.length > 0){
    setFilterStudent(newStudent);
    } }else{
        setFilterStudent(stud);
    }

 }


 const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
 if(modal){
    setStuData({...stuData,[name]:value});
 }else{
    setSelectedStudent({...selectedStudent,[name]:value});
}

 }

const attendModal = (elem) => {
    setAttendanceModal(true);
    setStudentAttendance(elem);
   
} 

const attendaneChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
 
    if(value === "present"){
        setAttendance({[name]: (studentAttendance.present + 1)} )
    }else{
       setAttendance({[name]: (studentAttendance.absent + 1)} ) 
    }

}


 const handleSubmit = async(e) => {
     e.preventDefault();
     setProgress(20);
    try{
     if(modal){
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/student`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stuData)
    }); 

    const res_data = await response.json();
     setProgress(40);
    if(response.ok){
     setStuData({
        name:"",
        classname:"",
        roll:"",
        father:"",
        mother:"",
        phone:"",
        email:"",
        password:"",
        adminemail: user.email,
        fee: "0", 
       });

      toast.success(res_data.message);
      userAuthentication();
      setModal(false);
      setProgress(80);
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
          }


    }else if(editModal){

    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/student/${selectedStudent._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedStudent)
    });
 
    const res_data = await response.json();
     setProgress(40);
    if(response.ok){
    setStuData({
       name:"",
       classname:"",
       roll:"",
       father:"",
       mother:"",
       phone:"",
       email:"",
       password:"",
       adminemail: user.email,
       fee: "", 
     });

      toast.success(res_data.message);
      userAuthentication();
      setEditModal(false);
      setProgress(80);
        }else{
            toast.error(res_data.extraDetails);
        }

   }else if(attendance){
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/student/${studentAttendance._id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance)
    });
 
    const res_data = await response.json();
     setProgress(40);
    if(response.ok){
       setAttendance(null);
       userAuthentication();
      setAttendanceModal(false);
      setProgress(80);
        }
   }else if(!attendance){
     toast.error("Please select attendance type");
   }  

   setProgress(100);     

  }catch(err){
        console.log(err);
    }
 }

 const del = async(elem) => {
    try{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/student/${elem._id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        
    });
     
     if(response.ok){
       userAuthentication();
       toast.success("Student deleted successfully");
     }

    }catch(error){
                console.log(error)
            }
  }

  const modalHide = () => { 
    modal ? setModal(false): setEditModal(false) 

 }

	return(
         <>
         	<section>
            <LoadingBar color='red' progress={progress} />
         	 <div className="student_container">
         	  <div className="info_box">
         	  <div className="search_box">
         	  	 <input type="number" name="search" max="12" placeholder="search student by class" onChange={filter}/>
         	  </div>
         	  <div className="student_box">
               {Array.isArray(filterStudent) && filterStudent.length > 0 ? (
                   filterStudent.map((elem, id) => (
         	  	  <div className="student_info" key={id} >
         	  	 	<table cellSpacing="0">
                  <thead>
         	  	 		<tr className="table_heading">
         	  	 			<th>Name</th>
         	  	 			<th>Class</th>
         	  	 			<th>Roll</th>
         	  	 			<th>Father's name</th>
         	  	 			<th>Mother's name</th>
         	  	 		</tr>
                     </thead>
                     <tbody>
         	  	 		<tr className="table_data">
         	  	 			<td>{elem.name}</td>
         	  	 			<td>{elem.classname}</td>
         	  	 			<td>{elem.roll}</td>
         	  	 			<td>{elem.father}</td>
         	  	 			<td>{elem.mother}</td>
         	  	 		</tr> 
                     </tbody>      	  	 		
         	  	 	</table>
                     <div className="action">
                        <div onClick={() => attendModal(elem)} ><span>A</span></div>
                           <div><VisibilityIcon onClick={()=>studModal(elem)} /></div>
                        <div><EditIcon onClick={() => editShow(elem)} /></div>
                        <div><DeleteIcon onClick={() => del(elem)}  /></div>
                     </div> 
         	  	     </div>   
                     ))
                       ) : (
                               <p style={{textAlign:"center"}}>No students available</p>
                             )}
         	  </div> 
           	  <div className="search_box">
         	  	<button className="add_student" onClick={modalShow}>Add student</button>
         	  </div>        	  
         	  </div> 
              { (modal || editModal) && 
              <div className="modal">
                 <div className="form_container">
                 <CloseIcon  onClick={modalHide} className="cutIcon" />
               <form onSubmit={handleSubmit} > 
                <div className="heading_container">
                 { editModal ? <h3>{selectedStudent.name}</h3> : <h3>Student Registration</h3> }
                </div>              
                <div className="student_input">
                <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.name : stuData.name}/>
                </div>
                <div>
                <label htmlFor="class">Class:</label>
                <input type="number" name="classname" id="class" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.classname : stuData.classname}/>
                </div>
                </div>
                <div className="student_input">
                <div>
                <label htmlFor="roll">Roll:</label>
                <input type="text" name="roll" id="roll" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.roll : stuData.roll}/>
                </div>
                <div>
                <label htmlFor="father">Father's name:</label>
                <input type="text" name="father" id="father" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.father : stuData.father}/>
                </div>
                </div>
                <div className="student_input">
                <div>
                <label htmlFor="mother">Mother's name:</label>
                <input type="text" name="mother" id="mother" autoComplete="off" onChange={onChange}value={editModal ? selectedStudent.mother : stuData.mother}/>
                </div>
                <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone" id="phone" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.phone : stuData.phone}/>
                </div>
                </div>
                <div className="student_input">
                <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.email : stuData.email}/>
                </div>
                { modal ? 
                ( <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.password : stuData.password}/>
                </div>) :
                (<div>
                <label htmlFor="fee">Fee:</label>
                <input type="text" name="fee" id="fee" autoComplete="off" onChange={onChange} value={editModal ? selectedStudent.fee : stuData.fee}/>
                </div>) }
                </div>             
                <div className="submit_container">
                    { editModal ? <input type="submit" value="Edit"/> : <input type="submit" value="Register"/> }
                </div>
                </form>
                 </div>
              </div>  } 
              { attendanceModal &&
              <div className="modal" >
                 <div className="form_container" style={{width:"25rem"}}>
                 <CloseIcon  onClick={() => setAttendanceModal(false)} className="cutIcon" />
                 <form onSubmit={handleSubmit} >
            <div className="category" style={{padding: "0.8rem"}}>
                <div style={{textAlign:"center"}}>
                <label htmlFor="present">Present:</label>
                <input type="radio" name="attendance" id="present" value="present" onChange={attendaneChange}/>
                <label htmlFor="absent">Absent:</label>
                <input type="radio" name="attendance" id="absent" value="absent" onChange={attendaneChange}/>
                </div>
                <div style={{textAlign:"center", marginTop:"1rem"}} >
                    <input type="submit"/>
                </div>
                 
            </div>                    
                 </form>                   	  
         	 </div>		
             </div> 
                   }


           { studentModal &&
            <div className="modal"> 
            <div className="student_profile" style={{backgroundColor:"white",position:"relative"}}>
             <CloseIcon  onClick={()=>setStudentModal(false)} className="cutIcon" />         
               <div className="profile_img">
                <img src="images/boy.png" alt="student pic" width="150" height="150"/>
               </div>
               <div className="student_data">
               <div>
                  <p><span>Name:</span> {selectedStudent.name}</p>
               </div>
               <div>  
                  <p><span>Class:</span> {selectedStudent.classname}</p>
               </div>
               <div>
                  <p><span>Roll:</span> {selectedStudent.roll}</p>
               </div>
               <div>   
                  <p><span>Father's name:</span> {selectedStudent.father}</p>
               </div>
               <div>
                  <p><span>Mother's name:</span> {selectedStudent.mother}</p>
               </div>
               <div>   
                  <p><span>Email:</span> {selectedStudent.email}</p>
               </div>
               <div>
                  <p><span>Fee:</span> {selectedStudent.fee}</p>
               </div>
               <div>  
                  <p><span>Attendance:</span> {selectedStudent.present}/{selectedStudent.present+selectedStudent.absent}</p>
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

export default Student;