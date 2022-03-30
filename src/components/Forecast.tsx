import './Forecast.css';

import React, { useCallback, useState } from 'react';
import { useFetchWeather } from '../hooks/useFetchWeather';
import CityInput from './CityInput';
import Conditions from './Conditions';

function Forecast() {
  const [city, setCity] = useState('');
  const { isLoading, data, error, fetchWeatherByCity, fetchCurrentPositionWeather } = useFetchWeather();
  const handleGetForecast = useCallback(() => fetchWeatherByCity(city), [fetchWeatherByCity, city]);
  const handleGetCurrentPosition = useCallback(async () => {
    setCity('');
    await fetchCurrentPositionWeather();
  }, [fetchCurrentPositionWeather]);

  return (
    <div className="forecast">
      <form className="forecast__form">
        <CityInput className="forecast__input" placeholder="Enter city" value={city} onChange={setCity} />
        <button
          type="submit"
          className="forecast__button forecast__button--primary"
          onClick={handleGetForecast}
          disabled={isLoading || !city}
        >
          Get forecast
        </button>
        <button
          type="button"
          className="forecast__button forecast__button--secondary"
          onClick={handleGetCurrentPosition}
          disabled={isLoading}
        >
          Current position
        </button>
      </form>
      {error && <p className="forecast__error">There is an error {error.message}.</p>}
      {isLoading && <span className="forecast__loader" />}
      {data && <Conditions data={data} />}
    </div>
  );
}

export default Forecast;
