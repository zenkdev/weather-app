export interface FetchWeatherResult {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  snow: {
    [duration: string]: number;
  };
  clouds: {
    [duration: string]: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface FetchWeatherOptions {
  q?: string;
  lat?: number;
  lon?: number;
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
  },
};

export const fetchWeather = async ({ q, lat, lon }: FetchWeatherOptions): Promise<FetchWeatherResult> => {
  let url = `https://community-open-weather-map.p.rapidapi.com/weather?units=metric`;
  if (q) {
    url += `&q=${encodeURIComponent(q)}`;
  }
  if (lat != null) {
    url += `&lat=${encodeURIComponent(lat)}`;
  }
  if (lon != null) {
    url += `&lon=${encodeURIComponent(lon)}`;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as FetchWeatherResult;
  return data;
};
