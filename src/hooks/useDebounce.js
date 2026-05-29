import { useState, useEffect } from "react";

export const useDebounce = (inputValue, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    // Start a timer to update the value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    // Clean up: cancel the timer if inputValue changes before delay finishes
    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};
