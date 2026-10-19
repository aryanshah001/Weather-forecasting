import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthStatus({children,authentication=true}) {

  const [loader,setLoader] = useState(true)
  const authstatus = useSelector(state => state.status)
  const navigate = useNavigate()

  useEffect(() => {
    if(authentication && authstatus!== authentication){
    navigate('/login')
  }
  else if (!authentication && authstatus !== authentication){
    navigate('/')
  }
  setLoader(false)
  }, [navigate,authentication,authstatus])

  return loader ? <>Loading...</> : <> {children} </>
}

export default AuthStatus