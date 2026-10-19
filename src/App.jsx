import {Outlet} from 'react-router-dom'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useEffect, useState } from "react"
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import {login,logout} from './store/authSlice'


function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userdata) => {
      if(userdata) dispatch(login())
        else{dispatch(logout())}
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  return loading ? <>Loading...</> : (
     <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1  bg-slate-100">
      <Outlet />
      </ main>
      <Footer />
    </div>
  )
}

export default App