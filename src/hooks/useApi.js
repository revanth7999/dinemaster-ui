import { useState } from "react";
import apiClient from "../components/utils/axiosUtil";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({
    method = "GET",
    url,
    data = null,
    params = null,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient({
        method,
        url,
        data,
        params,
      });

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    request,
    loading,
    error,
  };
};

export default useApi;
