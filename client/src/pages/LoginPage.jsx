import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const[currState,setCurrState] = useState("Sign up")
  const[fullName, setFullName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[bio, setBio] = useState("")
  const[isDataSubmitted, setIsDataSubmitted] = useState(false)

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    if(currState === "Sign up" && !isDataSubmitted){
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio});
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-4 sm:gap-8 lg:justify-evenly flex-col sm:flex-row lg:flex-row backdrop-blur-2xl px-4 sm:px-6 lg:px-8'>
      {/* left */}
       <h1 class="text-white w-[min(50vw,200px)] sm:w-[min(35vw,220px)] lg:w-[min(30vw,280px)] xl:w-[min(25vw,320px)] mb-6 sm:mb-0 font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl hover:scale-105 transition-transform duration-300 hover:text-violet-500">ChatIn</h1>
      {/* right */}
      <form onSubmit={onSubmitHandler} className='bg-slate-800/80 p-6 sm:p-8 lg:p-10 rounded-lg sm:rounded-xl shadow-xl w-md  max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 lg:mb-8 text-white flex items-center justify-between'>
          {currState}
          {isDataSubmitted && <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-4 sm:w-5 lg:w-6 cursor-pointer hover:opacity-70 transition-opacity'/>}
        </h2>
        
        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='w-full p-3 sm:p-4 lg:p-5 border text-white border-gray-300 rounded-lg mb-3 sm:mb-4 lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base' placeholder='Full Name' required/>
        )}

        {!isDataSubmitted &&(
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type="email" className='w-full p-3 sm:p-4 lg:p-5 border text-white border-gray-300 rounded-lg mb-3 sm:mb-4 lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base' placeholder='Email Address' required/>
           <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type="password" className='w-full p-3 sm:p-4 lg:p-5 border text-white border-gray-300 rounded-lg mb-3 sm:mb-4 lg:mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base' placeholder='Password' required/>
          </>
        )}
      
      {
        currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
           rows={4} className='w-full p-3 sm:p-4 lg:p-5 border text-white border-gray-300 rounded-lg mb-3 sm:mb-4 lg:mb-5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base' placeholder='Enter a short bio' required></textarea>
        )
      }
      <button type='submit' className='w-full bg-blue-600 text-white py-3 sm:py-4 lg:py-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-3 sm:mb-4 lg:mb-5 text-sm sm:text-base lg:text-lg'>
        {currState === "Sign up" ? "Create Account" : "Login Now"}
      </button>
      
      <div className='flex items-center gap-2 mb-3 sm:mb-4 lg:mb-5'>
        <input type="checkbox" className='w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0' />
        <p className='text-xs sm:text-sm lg:text-base text-white'>Agree to the terms of use & privacy policy</p>
      </div>

      <div className='text-center'>
        {currState === "Sign up" ? (
          <p className='text-xs sm:text-sm lg:text-base text-white'>Already have an account? <span onClick={()=>{setCurrState("Login"); setIsDataSubmitted(false)}}
          className='text-blue-600 cursor-pointer hover:underline font-medium'>Login here</span></p>
        ) : (
          <p className='text-xs sm:text-sm lg:text-base text-white'>Create an account <span onClick={()=>{setCurrState("Sign up")}} 
          className='text-blue-600 cursor-pointer hover:underline font-medium'>Click here</span></p>
        )}
      </div>

      </form>
    </div>
  )
}

export default LoginPage