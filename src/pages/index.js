import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Dashboard from "./ToDo/Index";
import PrivateRoute from "../components/PrivateRoute";
import { getToken } from "../redux/service";

const Pages = () => {
const navigate = useNavigate()

  useEffect(()=>{
    const token = getToken();
   if(token){
    navigate('/dashboard')
   }
  },[])
  return (
    <div>
   
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      
    </div>
  );
};

export default Pages;
