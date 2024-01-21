import {createContext,useState,useContext,useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

 const[sidebar,setSidebar] = useState(false);
 const[loading,setLoading] = useState(true);
 const[token,setToken] = useState(localStorage.getItem("token"));
 const[user,setUser] = useState("");
 const[stud,setStu] = useState("");
 const[teac,setTeac] = useState("");
 const[notices,setNotices] = useState("");

 const storetoken = (servertoken) => { 
  setToken(servertoken);
  return localStorage.setItem("token",servertoken);
 }

 const isLoggedIn = !!token ;

 const LogoutUser = () => {
   setToken("");
   setLoading(true);
   return localStorage.removeItem("token");
 }

 const showSidebar = () => {
 	setSidebar(true);
 }

  const hideSidebar = () => {
 	setSidebar(false);
 }

 // JWT authentication - to get the currently loggedIn user data 
 
 const userAuthentication = async() => {

   try{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/user`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if(response.ok){
      const data = await response.json();
  
      const { userData, studData, teacData, noticeData } = data;
      setUser(userData);
      setStu(studData);
      setTeac(teacData);
      setNotices(noticeData);
    }else{
       setLoading(false);
      console.log("Error fetching user data");
    }
      setLoading(false);
      

   }catch(error){
        console.error(error);
   }

 }

 useEffect(() => {
 if(isLoggedIn){
  userAuthentication();
   }
 },[token]);

  return (

  <AuthContext.Provider value = {{sidebar,showSidebar,hideSidebar,storetoken,LogoutUser,user,stud,teac,notices,isLoggedIn,userAuthentication,loading}} >
             {children}
  </AuthContext.Provider>
  );

}

export const useAuth = () => {
	const authContextValue = useContext(AuthContext);
	if(!authContextValue){
		throw new Error("useAuth is used outside of the provider");
	}

	return authContextValue;
}
