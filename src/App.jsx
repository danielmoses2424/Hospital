import { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Component/NavBar'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import {auth } from './firebase-configue'
import Footer from './Component/Footer'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Birth from './Pages/Birth'
import Antenetal from './Pages/Antenetal'
import About from './Pages/About'
import Search from './Pages/Search'
import Dashboard from './Pages/Dashboard'
import AntenetalsDetails from './Component/AntenetalsDetails'
import BirthDetails from './Component/BirthDetails'
import PageNotFound from './Pages/PageNotFound'

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
      <ToastContainer position='top-left' />
      <Navbar isAuth={isAuth} setuser={setuser} setisAuth={setisAuth}/>
    <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/birth' element={<Birth isAuth={isAuth}/>} />
           <Route path='/Birth_update/:id' element={<Birth isAuth={isAuth} />} />
          <Route path='/search' element={<Search/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/antenetal' element={<Antenetal  isAuth={isAuth}/>} />
         <Route path='/antenetal__update/:id' element={<Antenetal isAuth={isAuth} />} />
         <Route path='/dashboard' element={<Dashboard  isAuth={isAuth}/>} />
          <Route path='/antenetal_detail/:id' element={<AntenetalsDetails isAuth={isAuth} />} />
    <Route path='/birth_detail/:id' element={<BirthDetails isAuth={isAuth} />} /> 
         <Route path='/signup' element={<SignUp setisAuth={setisAuth} />}  />
    <Route path='/login' element={<Login setisAuth={setisAuth} setuser={setuser} />} />
    <Route path='*' element={<PageNotFound />} /> 
    </Routes>

    <Footer/>
    </Router>
    </div>
  )
}

export default App
