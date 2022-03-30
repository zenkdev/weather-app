import React from 'react';
import { FetchWeatherResult } from '../services/fetchWeather';

interface ConditionsProps {
  data: FetchWeatherResult;
}

function Conditions({ data }: ConditionsProps) {
  return (
    <div className="forecast__conditions">
      <h2>{data.name}</h2>
      <p>
        It is currently {Math.round(data.main.temp)}°C with {data.weather[0]?.description}
      </p>
    </div>
  );
}

export default Conditions;
