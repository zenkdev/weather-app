import { useCallback, useEffect, useReducer, useRef } from 'react';
import { fetchCities, FetchCitiesResult } from '../services/fetchCities';
import { Action, State } from './types';

export const useFetchCities = () => {
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<FetchCitiesResult> = {
    isLoading: undefined,
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (
    state: State<FetchCitiesResult>,
    action: Action<FetchCitiesResult>,
  ): State<FetchCitiesResult> => {
    switch (action.type) {
      case 'reset':
        return { ...initialState };
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

  const fetchCitiesByQuery = useCallback(async (query: string) => {
    // Clear results if the query is not given
    if (!query) {
      dispatch({ type: 'reset' });
      return;
    }

    dispatch({ type: 'loading' });

    try {
      const data = await fetchCities(query);
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

  return { ...state, fetchCitiesByQuery };
};
