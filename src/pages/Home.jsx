import { useState } from "react";
import useCustomhook from "../customHook/useCustomhook";

function Home() {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("Ahmedabad");
  const { error, loading, data } = useCustomhook(city);

  function handleSubmit(e) {
    e.preventDefault();
    const searchedCity = input.trim();
    if (searchedCity) {
      setCity(searchedCity);
    }
  }

  const temperature = data?.main?.temp;
  const feelsLike = data?.main?.feels_like;
  const weatherIcon = data?.weather?.[0]?.icon;
  const weatherDescription = data?.weather?.[0]?.description ?? "Weather conditions";

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-8 sm:px-6 lg:py-12">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-300 bg-white p-5 shadow-lg sm:p-8">
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a city"
            aria-label="Location"
            className="min-w-0 flex-1 rounded-lg border border-slate-500 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
          />

          <button
            type="submit"
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 sm:text-base"
          >
            Search
          </button>
        </form>

        {loading && <p className="mt-6 text-center text-slate-600">Loading...</p>}
        {error && (
          <p role="alert" className="mt-6 text-center text-red-600">
            {error}
          </p>
        )}

        {data && !loading && !error && (
          <div className="mt-8 rounded-xl bg-slate-300 p-5 text-center sm:p-7">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {data.name}   <span className=""> - ({data.sys.country})</span>
            </h1>
            {weatherIcon && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt={weatherDescription}
                className="mx-auto h-24 w-24"
              />
            )}
            <p className="-mt-2 capitalize text-slate-600">{weatherDescription}</p>
            <p className="mt-5 text-4xl font-semibold text-slate-900 sm:text-5xl">
              {(temperature - 273.15).toFixed(1)} °C
            </p>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Feels like {(feelsLike - 273.15).toFixed(1)} °C
            </p>
          </div>
        )}
      </section>

    </div>
  );
}

export default Home;
