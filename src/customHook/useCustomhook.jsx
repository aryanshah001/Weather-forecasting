import { useEffect, useState } from "react";

function useCustomhook(city) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      setData(null);
      return;
    }

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fe26bff63a3c5f54abbb5320535775b`
        );

        if (!res.ok) {
          throw new Error(
            res.status === 404 ? "City not found" : "Weather request failed"
          );
        }

        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [city]);

  return { loading, error, data };
}

export default useCustomhook;
