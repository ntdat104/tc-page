import React from 'react';
import axios from 'axios';

/**
 fixed :
  - no need to JSON.stringify to then immediatly do a JSON.parse
  - don't use export defaults, because default imports are hard to search for
  - axios already support generic request in one parameter, no need to call specialized ones
**/

type AxiosParams = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
};

export const useAxios = (axiosParams: AxiosParams) => {
  const [response, setResponse] = React.useState<any>(undefined);
  const [error, setError] = React.useState<any>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchData = React.useCallback((params: AxiosParams) => {
    axios
      .request(params)
      .then((response) => setResponse(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (loading === false) return;

    fetchData(axiosParams);
  }, [loading, axiosParams, fetchData]);

  return { response, error, loading };
};
