import React, { useState, useEffect } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=2056cd3a`;

const useFetch = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data); // data.Search for list, data for single
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
      setIsError({ show: true, msg: "Something went wrong!" });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getMovie(`${API_URL}${apiParams}`);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default useFetch;
