// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import store from './store/store.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import AuthStatus from './protected/AuthStatus.jsx'
import HistoricalData from './components/Footer/FooterLink/Products/HistoricalData.jsx'
import WeatherMap from './components/Footer/FooterLink/Products/WeatherMap.jsx'
import Terms from './components/Footer/FooterLink/Terms.jsx'
import Privacy from './components/Footer/FooterLink/Privacy.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

    <Route index element={
      <AuthStatus authentication>
        <Home/>
      </AuthStatus>
      
  } />
    <Route path='/login' element={
      <AuthStatus authentication={false}>
        <Login/>
      </AuthStatus>
      
  } />
    <Route path='/signup' element={
      <AuthStatus authentication={false}>
        <Signup/>
      </AuthStatus>
      
  } />

  <Route path = '/historicalData' element={
    <AuthStatus authentication={true}> <HistoricalData /> </AuthStatus>
  }  />

  <Route path='/weatherMap' element={<WeatherMap />} />
  <Route path='/terms' element={<Terms />} />
  <Route path='/privacy' element={<Privacy />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <RouterProvider router = {router} />
  </Provider>,
)
