import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import {auth, provider } from '../firebase-configue';
import {signInWithPopup} from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';



const GoogleAuth = ({setisAuth}) => {

  const navigate = useNavigate()


         //Google signUp func..
  const signinwithgoogle = () =>{
    signInWithPopup(auth, provider).then((result)=>{
      localStorage.setItem('AdminIsAuthorised', true); //storing in localstorage
      toast.success('signup successfully');
      setisAuth(true);
      navigate('/')
    })
 };


  return (
    <div>
      <button 
      type='submit' 
      className='w-full md:my-2 p-3 bg-[#02020F] text-white rounded-lg font-semibold'
      onClick={signinwithgoogle}
      > Google signin</button>
    </div>
  )
}

export default GoogleAuth
