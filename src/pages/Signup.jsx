import { useState } from "react"
import authService from "../appwrite/auth"
import {useForm} from 'react-hook-form'
import { useDispatch } from "react-redux"
import { useNavigate,Link } from "react-router-dom"
import { login } from "../store/authSlice"

function Signup() {
    const [error , setError] = useState(null)
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signup = async(data) => {
        try {
            const create = await authService.createAccount(data)
            if(create){
                const userAcc = await authService.getCurrentUser()
                if(userAcc) dispatch(login({userData:userAcc}))
                    navigate('/')
            }
        } catch (error) {
            console.log('error::signup',error);
            setError(error.message)
        }
    }

  return (
    <div className="min-h-screen ml-2 mt-4 sm:ml-4 sm:mt-6 md:ml-12 md:mt-8">

       {error && <p> {error} </p>}

       
        <div className=" w-full max-w-md  min-h-96 border-2 border-gray-300 rounded-lg  shadow-md justify-center flex flex-col items-center bg-slate-50">
            <form onSubmit={handleSubmit(signup)}>
                <div className="text-4xl font-bold text-black flex justify-center mb-7 border-1 border-slate-300 pb-3">Signup</div>
            <label>Enter Name :-</label>
        <input 
        className="border-2 border-black px-2 ml-2"
        placeholder="enter full Name"
        {...register('name',{required:true})}
        type="text" 
        /> <br /> <br />

            <label>Enter Email :-</label>
        <input 
        className="border-2 border-black px-2 ml-2"
        placeholder="Email"
        {...register('email',{required:true})}
        type="email" 
        /> <br /> <br />

        <label>Enter PASSWORD :-</label>
        <input 
        className="border-2 border-black px-2 ml-2"
        placeholder="enter password"
        type="text" 
        {...register('password',{required:true})}
        /> <br /><br />

        <div className="ml-18">
            <button 
        className="border-2 border-black px-3 py-1 bg-slate-300 hover:bg-blue-300 rounded-lg"
        type="submit">Signup</button>
        </div>
        </form> <br />

        <p>Already Have an Account </p>
       <p className="mt-1"> click Here
        <Link 
       className=" px-1 ml-2 text-blue-500 hover:text-blue-600"
       to='/login'> Login</Link></p> <br />
        </div>


    </div>
  )
}

export default Signup