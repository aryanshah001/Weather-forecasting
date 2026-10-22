import { useEffect, useState } from 'react'

const DEFAULT_LOCATION = {
  name: 'Ahmedabad',
  latitude: 23.0225,
  longitude: 72.5714,
  timezone: 'Asia/Kolkata',
}

async function getForecast(location) {
  const params = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    forecast_days: '7',
    timezone: location.timezone || 'auto',
  })
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

  if (!response.ok) throw new Error('Unable to load the forecast.')
  return response.json()
}

function useCustomhook() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [location, setLocation] = useState(DEFAULT_LOCATION)

  useEffect(() => {
    getForecast(DEFAULT_LOCATION)
      .then(setData)
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  const searchCity = async (cityName) => {
    const query = cityName.trim()
    if (!query) {
      setError('Enter a city name to search.')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const geocodingParams = new URLSearchParams({ name: query, count: '1', language: 'en', format: 'json' })
      const geocodingResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${geocodingParams}`)
      if (!geocodingResponse.ok) throw new Error('Unable to search for that city.')

      const result = (await geocodingResponse.json()).results?.[0]
      if (!result) throw new Error(`No city found for "${query}". Try another name.`)

      const nextLocation = {
        name: result.name,
        admin1: result.admin1,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
        timezone: result.timezone || 'auto',
      }
      const forecast = await getForecast(nextLocation)
      setLocation(nextLocation)
      setData(forecast)
      return true
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to load the forecast.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, data, location, searchCity }
}

export default useCustomhook
