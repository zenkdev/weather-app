export interface FetchCitiesItem {
  city: string;
  countryCode: string;
}
export interface FetchCitiesResult {
  results: FetchCitiesItem[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'world-cities-and-countries.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
  },
};

export const fetchCities = async (query: string): Promise<FetchCitiesResult> => {
  const url = `https://world-cities-and-countries.p.rapidapi.com/v1/locations/cities/${encodeURIComponent(
    query,
  )}?limit=10`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as FetchCitiesResult;
  return data;
};
