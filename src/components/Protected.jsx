import { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "./Context";

const Protected = (props) => {
  const { Component } = props;
  const { user,loading,isLoggedIn } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if(isLoggedIn){
      if(!loading){	
  
  	if(user){
        switch (user.category) {
            case "admin":
            case "teacher":
            case "student":
              // If the user is admin, teacher, or student, render the component
              break;
            default:
              // Redirect to login for any other user category
              navigate("/login");
          }
  	 }
         }

      }else if(!isLoggedIn){
       if(!user){
         navigate("/login");
       }
     }  

  }, [loading]);


  return !loading && <Component />;

};

export default Protected;
