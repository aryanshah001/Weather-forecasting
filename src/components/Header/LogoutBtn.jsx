import { useDispatch } from "react-redux"
import authService from '../../appwrite/auth'
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

function LogoutBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LogoutHandler = () => {
        authService.logout()
        .then(() => dispatch(logout()))
        navigate('/login')
    }
  return (
    <div>
        <button 
        className="border-2 border-black px-2 py-2 rounded-lg hover:bg-amber-100"
        onClick={LogoutHandler}>Logout</button>
    </div>
  )
}

export default LogoutBtn