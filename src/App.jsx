import "./components/css/responsive.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Student_profile from "./pages/Student_profile";
import Teacher_profile from "./pages/Teacher_profile";
import Admin_profile from "./pages/Admin_profile";
import Error from "./pages/Error";
import Logout from "./components/Logout";
import Protected from "./components/Protected";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
       <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Registration/>} />        
         <Route path="/login" element={<Login/>} />
         <Route path="/admin" element={<Protected Component={Admin} />} />
         <Route path="/student" element={<Student />} />
         <Route path="/teacher" element={<Teacher />} />
         <Route path="/admin_profile" element={<Admin_profile/>} />
         <Route path="/student_profile" element={<Protected Component={Student_profile} />} />
         <Route path="/teacher_profile" element={<Protected Component={Teacher_profile} />}/>
         <Route path="/logout" element={<Logout/>} />
         <Route path="*" element={<Error/>} />
       </Routes>
       <Footer/>
       </BrowserRouter>
    </>
  )
}

export default App;
