import "./css/notice.css";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAuth} from "./Context"

const Notice = () => {

  const {user,notices,userAuthentication} = useAuth();

 
const noticeDelete = async(elem) => {
   try{
   
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/notices/${elem._id}`,{
      method: "DELETE", 
       headers: {
            "Content-Type": "application/json",
        }
    });

    if(response.ok){
       userAuthentication();
    }  

   }catch(error){
     console.log(error);
   }
 }

  return (
    <>
      <div className="notice_container">
        <div className="notice_box">
          <div className="notice_heading">
            <h3>Notice</h3>
          </div>
          <div className="notice">
            {Array.isArray(notices) && notices.length > 0 ? (
              notices.map((elem, id) => (
                <div className="noticeData" key={id}><li>{elem.noticedata}</li>
               { (user.category === "admin") && <DeleteIcon  className="noticeDelete" onClick={()=>noticeDelete(elem)} /> }
                </div>
              ))
            ) : (
              <p style={{textAlign:"center",marginTop:"2rem"}}>No any notices yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
