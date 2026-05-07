import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // setting the loading state to be true while data is being fetched
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (e) {
        // errpr message will be console.log
        setError(e.message);
        console.log(e);
      } finally {
        // setting the loading state to be false after data is fetched
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // returning all the states to be used on other components
  return [data, isLoading, error];
};
