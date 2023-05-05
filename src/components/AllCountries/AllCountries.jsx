import React, { useEffect, useState } from "react"
import { apiURL } from "../util/api"
import SearchInput from "../Search/SearchInput"
import FilterCountry from "../FilterCountry/FilterCountry"
import { Link } from "react-router-dom"

const AllCountries = () => {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`)
      if (!res.ok) throw new Error("Something went wrong!")
      const data = await res.json()
      console.log(data)
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }
  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`)

      if (!res.ok) throw new Error("Not found any country!")

      const data = await res.json()
      setCountries(data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }
  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`)
      if (!res.ok) throw new Error("Failed............")

      const data = await res.json()
      setCountries(data)
    } catch (error) {
      setIsLoading(false)
      setError(false)
    }
  }

  useEffect(() => {
    getAllCountries()
  }, [])
  return (
    <div className='all__country__wrapper'>
      <div className='country__top'>
        <div className='search'>
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className='filter'>
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
        <div className='country__button'>
          {isLoading && !error && <h4>Loading ......</h4>}
          {error && !isLoading && <h4>{error}</h4>}
          {countries?.map((country) => (
            <Link to={`/country/${country.name.common}`}>
              {" "}
              <div className='country__cart' key={country.id}>
                <div className='country__img'>
                  <img src={country.flags.png} alt='' />
                </div>
                <div className='country__data'>
                  <h3>{country.name.common}</h3>

                  <h6>Population:{country.population}</h6>
                  <h6>Region:{country.region}</h6>
                  <h6>Capital:{country.capital}</h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllCountries
