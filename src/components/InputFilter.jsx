import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const InputFilter = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState('');

  // Create a debounced version of onFilterChange
  const debouncedFilterChange = useCallback(
    debounce((value) => {
      onFilterChange(value);
    }, 300),
    [onFilterChange]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFilterChange(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputFilter;