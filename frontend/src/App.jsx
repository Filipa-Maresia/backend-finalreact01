import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies"; 
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import axios from "axios";
import AddMovie from "./components/AddMovie"; 
import EditMovie from "./components/EditMovie"; 
import DeleteMovie from "./components/DeleteMovie"; 
import AddUser from "./components/AddUser";
import Dashboard from "./components/Dashboard";

function App() {
  const [role, setRole] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5173/auth/verify')
    .then(res => {
      if(res.data.login) {
        setRole(res.data.role)
      } else {
       setRole('') 
      }
      console.log(res)
    }).catch(err => console.log(err))
  }, [])
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/movies" element={<Movies role={role}/>}></Route> 
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/adduser" element={<AddUser />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole}/>}></Route>
        <Route path="/logout" element={<Logout setRole={setRole}/>}></Route>
        <Route path="/addmovie" element={<AddMovie />}></Route> 
        <Route path="/movie/:id/edit" element={<EditMovie />}></Route> 
        <Route path="/movie/:id/delete" element={<DeleteMovie />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

