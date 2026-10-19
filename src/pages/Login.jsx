import { useForm } from "react-hook-form"
import { useNavigate,Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { login } from "../store/authSlice"
import { useState } from "react"

function Login() {
  const [error,setError] = useState(null)
  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async(data) => {
    try {
      const res = await authService.login(data)
    if(res){
      const userData = await authService.getCurrentUser()
      if(userData) {
        dispatch(login({userData}))
        navigate('/')
      }
    }
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <div className="min-h-screen ml-2 mt-4 sm:ml-4 sm:mt-6 md:ml-12 md:mt-8 ">

      {error&& <p> {error} </p>}

      
      
      <div className=" w-full max-w-md  min-h-96 border-2 border-gray-300 rounded-lg  shadow-md justify-center flex flex-col items-center bg-slate-50">

        <form onSubmit={handleSubmit(handleLogin)}>

          <div className="text-4xl font-bold text-black flex justify-center mb-8 border-1 border-slate-300 pb-3">Login</div>

        <label>Email :-</label>
        <input 
        className="border-2 border-black px-2 ml-2"
        {...register('email',{required:true})}
        type="text"
        placeholder="enter email"
         /> <br /><br />

         <label>Password :- </label>
         <input 
         className="border-2 border-black px-2 ml-2"
         {...register('password',{required:true})}
         type="text"
         placeholder="enter password"
          /> <br /><br />

        <button 
        className=" ml-18 border-2 border-black px-3 py-1 bg-slate-300 hover:bg-blue-300 rounded-lg"
        type="submit"
        >Login</button>
      </form> <br />

      <div className="text-lg">
        Don't have an Account. Create New Accouont
        <p className="ml-18 text-blue-500 "><Link to='/signup'> Signup </Link></p>
      </div> <br /><br />
      </div>
    </div>
  )
}

export default Login