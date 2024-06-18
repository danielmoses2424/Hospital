import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Component/NavBar'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import {auth } from './firebase-configue'
import Footer from './Component/Footer'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

   const [user, setuser] = useState(null);
  const [isAuth, setisAuth] = useState(localStorage.getItem('AdminIsAuthorised'));

  //auth user with useEffect
  useEffect(()=>{
    auth.onAuthStateChanged((authUser) => {
     if (authUser){
       setuser(authUser);
     }else{
       setuser(null)
     }
    })
 },[user]);

  return (
    <div>
    <Router>
      <ToastContainer position='top-right' />
      <Navbar isAuth={isAuth} />
    <Routes>
         <Route path='/signup' element={<SignUp setisAuth={setisAuth} />}  />
    <Route path='/login' element={<Login setisAuth={setisAuth} setuser={setuser} />} />
    </Routes>

    <Footer/>
    </Router>
    </div>
  )
}

export default App
