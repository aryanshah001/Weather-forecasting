import { useRef, useState } from 'react'
import useCustomhook from '../customHook/useCustomhook'

function getWeather(code) {
  switch (code) {
    case 0:
      return { label: 'Clear sky', type: 'sun', color: 'text-amber-500', bg: 'from-amber-100 to-orange-50' }
    case 1:
      return { label: 'Mainly clear', type: 'partly-cloudy', color: 'text-amber-500', bg: 'from-amber-100 to-sky-50' }
    case 2:
      return { label: 'Partly cloudy', type: 'partly-cloudy', color: 'text-sky-500', bg: 'from-sky-100 to-white' }
    case 3:
      return { label: 'Overcast', type: 'cloud', color: 'text-slate-500', bg: 'from-slate-200 to-slate-50' }
    case 45:
    case 48:
      return { label: 'Foggy', type: 'fog', color: 'text-slate-500', bg: 'from-slate-200 to-white' }
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { label: 'Drizzle', type: 'rain', color: 'text-sky-500', bg: 'from-sky-100 to-white' }
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { label: 'Rain', type: 'rain', color: 'text-blue-600', bg: 'from-blue-100 to-white' }
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { label: 'Snow', type: 'snow', color: 'text-cyan-600', bg: 'from-cyan-100 to-white' }
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', type: 'storm', color: 'text-violet-600', bg: 'from-violet-100 to-white' }
    default:
      return { label: 'Variable weather', type: 'cloud', color: 'text-slate-500', bg: 'from-slate-100 to-white' }
  }
}

function WeatherIcon({ type, className }) {
  return (
    <svg viewBox='0 0 64 64' className={className} fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' role='img' aria-label={`${type} weather`}>
      {type === 'sun' && <>
        <circle cx='32' cy='32' r='11' fill='currentColor' stroke='none' />
        <path d='M32 5v7m0 40v7M5 32h7m40 0h7M13 13l5 5m28 28 5 5m0-38-5 5M18 46l-5 5' />
      </>}
      {type === 'partly-cloudy' && <>
        <circle cx='42' cy='20' r='9' fill='currentColor' stroke='none' />
        <path d='M18 48h29a9 9 0 0 0 0-18 14 14 0 0 0-26-3 10 10 0 0 0-3 21Z' fill='white' />
      </>}
      {(type === 'cloud' || type === 'fog') && <>
        <path d='M15 40h34a9 9 0 0 0 0-18 14 14 0 0 0-26-3 10 10 0 0 0-8 21Z' fill='white' />
        {type === 'fog' && <path d='M12 49h40M18 56h28' />}
      </>}
      {(type === 'rain' || type === 'snow' || type === 'storm') && <>
        <path d='M14 38h35a9 9 0 0 0 0-18 14 14 0 0 0-26-3 10 10 0 0 0-9 21Z' fill='white' />
        {type === 'rain' && <path d='m23 45-3 7m15-7-3 7m15-7-3 7' />}
        {type === 'snow' && <path d='M24 45v10m-4-8 8 6m0-6-8 6m22-8v10m-4-8 8 6m0-6-8 6' />}
        {type === 'storm' && <path d='m36 42-9 12h8l-3 8 12-15h-8l3-5' fill='currentColor' />}
      </>}
    </svg>
  )
}

function CitySearch({ value, onChange, onSubmit, loading, error }) {
  return (
    <div className='mx-auto w-full max-w-xl'>
      <form onSubmit={onSubmit} className='flex gap-2'>
        <label htmlFor='weather-city' className='sr-only'>Search city</label>
        <input id='weather-city' type='search' value={value} onChange={(event) => onChange(event.target.value)} placeholder='Search a city...' className='min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200' />
        <button type='submit' disabled={loading} className='rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60'>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className='mt-2 text-left text-sm text-rose-700' role='alert'>{error}</p>}
    </div>
  )
}

function Home() {
  const { loading, error, data, location, searchCity } = useCustomhook()
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [cityQuery, setCityQuery] = useState('')
  const hourlySlider = useRef(null)

  if (loading) return <main className='grid min-h-96 place-items-center bg-gradient-to-br from-sky-50 to-indigo-100 p-8 text-slate-600'><p className='animate-pulse'>Loading forecast...</p></main>

  const daily = data?.daily ?? {}
  const dates = daily.time ?? []
  const hourly = data?.hourly ?? {}

  const handleCitySearch = (event) => {
    event.preventDefault()
    searchCity(cityQuery).then((success) => {
      if (success) {
        setCityQuery('')
        setSelectedDayIndex(0)
      }
    })
  }

  if (dates.length === 0) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 px-4 py-10 text-center text-slate-700'>
        <h1 className='mb-5 text-3xl font-bold'>Search weather by city</h1>
        <CitySearch value={cityQuery} onChange={setCityQuery} onSubmit={handleCitySearch} loading={loading} error={error} />
      </main>
    )
  }

  const selectedDate = dates[selectedDayIndex]
  const selectedWeather = getWeather(daily.weather_code?.[selectedDayIndex])
  const selectedHours = (hourly.time ?? [])
    .map((time, index) => ({ time, index }))
    .filter(({ time }) => time.startsWith(selectedDate))
  const selectedDayName = selectedDayIndex === 0
    ? 'Today'
    : new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 px-4 py-10 text-slate-900 sm:px-6'>
      <section className='mx-auto max-w-6xl'>
        <header className='mb-8 text-center'>
          <h1 className='mt-2 py-3  text-3xl font-extrabold tracking-tight sm:text-4xl'>7-Day Forecast</h1>
          <p className='text-sm font-bold uppercase tracking-[0.2em] text-sky-700'>Weather in {location.name}</p>
          
          <p className='mt-2 text-slate-600'>{[location.admin1, location.country, data.timezone?.replaceAll('_', ' ') || 'Local time'].filter(Boolean).join(' · ')}</p>
          <div className='mt-5'>
            <CitySearch value={cityQuery} onChange={setCityQuery} onSubmit={handleCitySearch} loading={loading} error={error} />
          </div>
        </header>

        <section className={`mb-8 overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br ${selectedWeather.bg} shadow-xl shadow-slate-400/15`}>
          <div className='grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-wider text-slate-500'>{selectedDayName} · {selectedDate}</p>
              <h2 className='mt-2 text-3xl font-extrabold'>{selectedWeather.label}</h2>
              <p className='mt-2 text-slate-600'>Forecast details for {selectedDayName.toLowerCase()}</p>
            </div>
            <div className='flex items-center gap-5 sm:pr-6'>
              <WeatherIcon type={selectedWeather.type} className={`h-24 w-24 sm:h-28 sm:w-28 ${selectedWeather.color}`} />
              <div>
                <p className='text-sm font-semibold text-slate-500'>High</p>
                <p className='text-4xl font-extrabold'>{daily.temperature_2m_max?.[selectedDayIndex] ?? '-'}{String.fromCharCode(176)}C</p>
                <p className='mt-2 text-lg font-semibold text-slate-600'>Low {daily.temperature_2m_min?.[selectedDayIndex] ?? '-'}{String.fromCharCode(176)}C</p>
              </div>
            </div>
          </div>

          <div className='border-t border-white/70 bg-white/50 p-5 sm:p-6'>
            <div className='mb-4 flex items-center justify-between gap-3'>
              <h3 className='font-bold text-slate-700'>Hourly details</h3>
              <div className='flex gap-2'>
                <button type='button' onClick={() => hourlySlider.current?.scrollBy({ left: -320, behavior: 'smooth' })} aria-label='Show earlier hours' className='grid h-9 w-9 place-items-center rounded-full border border-slate-300 bg-white text-lg font-bold text-slate-700 shadow-sm hover:bg-slate-50'>‹</button>
                <button type='button' onClick={() => hourlySlider.current?.scrollBy({ left: 320, behavior: 'smooth' })} aria-label='Show later hours' className='grid h-9 w-9 place-items-center rounded-full border border-slate-300 bg-white text-lg font-bold text-slate-700 shadow-sm hover:bg-slate-50'>›</button>
              </div>
            </div>
            {selectedHours.length > 0 ? (
              <div ref={hourlySlider} className='flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3'>
                {selectedHours.map(({ time, index }) => (
                  <div key={time} className='min-w-32 flex-none snap-start rounded-2xl border border-white bg-white/80 p-3 text-center shadow-sm'>
                    <p className='text-sm font-semibold text-slate-600'>{new Date(time).toLocaleTimeString('en-US', { hour: 'numeric' })}</p>
                    <p className='my-2 text-2xl font-bold'>{hourly.temperature_2m?.[index] ?? '-'}{String.fromCharCode(176)}</p>
                    <p className='text-xs text-slate-500'>Humidity {hourly.relative_humidity_2m?.[index] ?? '-'}%</p>
                    <p className='mt-1 text-xs text-sky-700'>Rain {hourly.precipitation_probability?.[index] ?? '-'}%</p>
                  </div>
                ))}
              </div>
            ) : <p className='text-sm text-slate-500'>Hourly details are not available.</p>}
          </div>
        </section>

        <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5'>
          {dates.map((date, index) => {
            const maxTemp = daily.temperature_2m_max?.[index]
            const minTemp = daily.temperature_2m_min?.[index]
            const code = daily.weather_code?.[index]
            const weather = getWeather(code)
            const dayName = index === 0
              ? 'Today'
              : new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long' })

            return (
              <button key={date} type='button' onClick={() => setSelectedDayIndex(index)} aria-pressed={selectedDayIndex === index} className={`group w-64 flex-none snap-start overflow-hidden rounded-3xl border text-left shadow-lg backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 ${selectedDayIndex === index ? 'border-sky-500 bg-white ring-2 ring-sky-200' : 'border-white/80 bg-white/80'}`}>
                <div className={`flex flex-col items-center bg-gradient-to-br ${weather.bg} px-5 pb-5 pt-6`}>
                  <h2 className='text-lg font-bold'>{dayName}</h2>
                  <p className='mt-1 text-sm text-slate-500'>{new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <WeatherIcon type={weather.type} className={`my-4 h-20 w-20 transition group-hover:scale-110 ${weather.color}`} />
                  <span className={`rounded-full bg-white/80 px-3 py-1 text-sm font-semibold ${weather.color}`}>{weather.label}</span>
                </div>
                <div className='flex items-center justify-center gap-8 px-5 py-4'>
                  <div className='text-center'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>High</p>
                    <p className='mt-1 text-2xl font-extrabold text-slate-800'>{maxTemp ?? '—'}<span className='text-base font-semibold'>°C</span></p>
                  </div>
                  <div className='h-10 border-l border-slate-200' />
                  <div className='text-center'>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Low</p>
                    <p className='mt-1 text-2xl font-extrabold text-slate-500'>{minTemp ?? '—'}<span className='text-base font-semibold'>°C</span></p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Home
