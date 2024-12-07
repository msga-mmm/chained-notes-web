import { BACKEND_URL } from "src/constants";

import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({ baseURL: BACKEND_URL });

// Second `options` argument to pass extra options to each generated query

export const customInstance = <T>(
   
  config: AxiosRequestConfig,
   
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE<T>({
    ...config,

    ...options,

    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error injected cancel method used by orval to cancel the query
   
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// Type overrides for react-query and swr to override the return error type.

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
