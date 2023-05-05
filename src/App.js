import React from "react"
import "./app.css"
import { Routes, Route } from "react-router-dom"
import AllCountries from "./components/AllCountries/AllCountries"
import CountryInfo from "./components/CountryInfo/CountryInfo"




const App = () => {
  return (
    <>
      <div className='header'>
        <div className='container'>
          <h5>Where in the world</h5>
        </div>
      </div>
      <div className='container'>
        <Routes>
          <Route path="/" element={<AllCountries/>}></Route>
          <Route path="/country/:countryName" element={<CountryInfo/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
