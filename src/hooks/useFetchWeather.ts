import { useCallback, useEffect, useReducer, useRef } from 'react';
import { fetchWeather, FetchWeatherResult } from '../services/fetchWeather';
import { getCurrentPosition } from '../services/getCurrentPosition';
import { Action, State } from './types';

export const useFetchWeather = () => {
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<FetchWeatherResult> = {
    isLoading: undefined,
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (
    state: State<FetchWeatherResult>,
    action: Action<FetchWeatherResult>,
  ): State<FetchWeatherResult> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState, isLoading: true };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchWeatherByCity = useCallback(async (city: string) => {
    // Do nothing if the city is not given
    if (!city) return;

    dispatch({ type: 'loading' });

    try {
      const data = await fetchWeather({ q: city });
      if (cancelRequest.current) return;

      dispatch({ type: 'fetched', payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: 'error', payload: error as Error });
    }
  }, []);

  const fetchCurrentPositionWeather = useCallback(async () => {
    dispatch({ type: 'loading' });

    try {
      const { coords } = await getCurrentPosition();
      const data = await fetchWeather({ lat: coords.latitude, lon: coords.longitude });
      if (cancelRequest.current) return;

      dispatch({ type: 'fetched', payload: data });
    } catch (error) {
      if (cancelRequest.current) return;

      dispatch({ type: 'error', payload: error as Error });
    }
  }, []);

  useEffect(() => {
    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
  }, []);

  return { ...state, fetchWeatherByCity, fetchCurrentPositionWeather };
};
