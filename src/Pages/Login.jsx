import {useState} from 'react';
import {AiOutlineMail, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {Link, useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import {auth, provider } from '../firebase-configue';
import { toast } from "react-toastify";
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';


const initialState = {
    email: '',
    password: '',
  };

const Login = ({setisAuth, setuser}) => {

      const navigate = useNavigate();
      const [passwordEye, setPasswordEye] = useState(false);

       const [formValue, setFormValue] = useState(initialState);
       const { email, password } = formValue;

       //targeting the input
    const onInputChange = (e) =>{
      setFormValue({...formValue, [e.target.name]: e.target.value});
    }

     //func... for password 
     const handlePasswordEye = () => {
      setPasswordEye(!passwordEye)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if ( email === '' || password === ''){
        return toast.error('please fill the input field');
      }else{
        try {
          if( email && password ){
          const {user} = await signInWithEmailAndPassword(
            auth, email, password
          )
          setuser(user)
          localStorage.setItem('AdminIsAuthorised', true);
          setisAuth(true)
          toast.success('Login successfully')
          navigate('/')
          }
        } catch (error) {
          toast.error(error.message)
          console.log(error)
        }
      }
    }
      

      

        
  return (
     <div className='mt-[8vh] bg_image'>
    <div className='max-w-[800px] m-auto px-4 py-16 '>
      <div className=' dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
        <h1 className='text-2xl font-bold text-gray-800' > Login Account </h1> 
        <form  onSubmit={handleSubmit}>
          <div className='grid md:grid-cols-2 md:gap-8'>
            <div className='md:my-4'>
              <label>Email Address</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="email" 
                  placeholder='Enter Email Address' 
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  
                />
                <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
              </div>
            </div>

            <div className='md:my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(passwordEye === false) ? 'password' : 'text'} 
                  placeholder='Enter Password'
                  name='password'
                  value={password}
                  onChange={onInputChange}
                />
                <div className='absolute right-2 top-3'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
              </div>
            </div>
          </div>

          <p className='text-center text-sm py-1'>By signing in you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
                 
          <button type='submit' className='w-full my-4 md:my-2 p-3 bg-[#02020F] text-white rounded-lg font-semibold'> Login Account </button>
        </form>
         <GoogleAuth setisAuth={setisAuth}/>

        
        <hr className="my-6 border-gray-300 w-full" />
     

        <p className='my-4'>Don't have an account? <Link className='text-[#986c55] underline' to='/signup'>Signup</Link></p>
      </div>
    </div>
  </div>
  )
}

export default Login
