import React, { ChangeEvent, useCallback, useMemo } from 'react';
import Autocomplete from 'react-autocomplete';
import { debounce } from 'ts-debounce';
import { useFetchCities } from '../hooks/useFetchCities';
import { FetchCitiesItem } from '../services/fetchCities';

interface CityInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

function CityInput({ value, onChange, className, placeholder }: CityInputProps) {
  const { data, fetchCitiesByQuery } = useFetchCities();
  const debouncedFetchCitiesByQuery = useMemo(() => debounce(fetchCitiesByQuery, 600), [fetchCitiesByQuery]);
  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange?.(newValue);
      await debouncedFetchCitiesByQuery(newValue?.length > 2 ? newValue : '');
    },
    [onChange, debouncedFetchCitiesByQuery],
  );
  return (
    <Autocomplete
      inputProps={{ className, placeholder }}
      getItemValue={(item: FetchCitiesItem) => item.city}
      items={data?.results || []}
      renderItem={(item: FetchCitiesItem, isHighlighted: boolean) => (
        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>{item.city}</div>
      )}
      value={value}
      onChange={handleChange}
      onSelect={onChange}
    />
  );
}

export default CityInput;
