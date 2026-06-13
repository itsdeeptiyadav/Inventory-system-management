import { useEffect, useState } from "react";
import api from "../services/api";

function useFetch(url) {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    async function fetchData() {

      try {

        const response =
          await api.get(url);

        setData(response.data);

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }
    }

    fetchData();

  }, [url]);

  return {
    data,
    loading,
    error
  };
}

export default useFetch;