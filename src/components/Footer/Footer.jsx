import { Link } from "react-router-dom"
import HistoricalData from "./FooterLink/Products/HistoricalData"
import WeatherMap from './FooterLink/Products/WeatherMap'
import Privacy from './FooterLink/Privacy'
import Terms from "./FooterLink/Terms"

function Footer() {
  return (
    <div className=" py-2 bg-black text-white px-5">

      <div className="font-bold text-3xl mb-12 flex justify-center">
        World's most flexible weather data platform
      </div>

      <div className="flex justify-between ">
        {/* products  */}
        <ul className="">
          <div>
            <span className="text-lg border-b-2">Products</span>

          <div className="mt-4">
            <li><Link to='/historicalData'>Historical weather data</Link></li>
          <li><Link to='/weatherMap'>Weather map</Link></li>
          <li>Weather dashboard</li>
          <li>Widgets</li>
          </div>
          </div>

        </ul>

        {/* Subscription */}
        <ul className="">
          <div>
            <span className="text-lg border-b-2">Products</span>

          <div className="mt-4">
            <li>How to start</li>
          <li>Pricing</li>
          <li>Subscribe for free</li>
          <li>FAQ</li>
          </div>
          </div>

        </ul>

        {/* Technology */}
         <ul className="">
          <div>
            <span className="text-lg border-b-2">Products</span>

          <div className="mt-4">
            <li>Our technology</li>
          <li>Accuracy and Quality</li>
          <li>Connect your weather station</li>
         
          </div>
          </div>

        </ul>
      </div>


        <div className="flex justify-between mt-12">

          <div className="">
          <div className="flex gap-10 mx-2">
            <Link to='terms'>Terms and Conditions</Link>
          <Link to='privacy'>Privacy and Policy</Link>
          </div>


          <div className="mt-5">
            ©2012-2026 All rights reserved
          </div>
        </div>


          <div className="">
          <h1 className="text-lg font-bold">company</h1>
          <p className="h-35 w-100">Open weather is a London based company serving enterprises, developers, businesses and researchers worldwide. this company provides global weather data and forecasting services via fast, reliable Apis</p>
        </div>


        
        </div>
      </div>
  )
}

export default Footer