import { useCallback, useEffect, useRef } from "react";

import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ReadonlyDeep } from "type-fest";

type UseInjectTokenToAxiosInstanceParams = {
  axiosInstance: AxiosInstance;
  getToken: () => Promise<string>;
  onUnauthorized?: () => Promise<void>;
};

/**
 * Hook to create an axios interceptor for the given axios instance to inject
 * the token from the provided callback.
 *
 * When a request of the given axios instance fails due to unauthorized error
 * the provided onAuthorized callback will be called.
 */
export function useInjectTokenToAxiosInstance({
  axiosInstance,
  getToken,
  onUnauthorized,
}: ReadonlyDeep<UseInjectTokenToAxiosInstanceParams>) {
  const axiosInterceptor = useRef<number | null>(null);

  const handleFulfilled = useCallback(
    // TODO: avoid disabling the rule functional/prefer-immutable-types, it is
    // currently disabled due to the type of axios interceptors
     
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();
      // TODO: avoid disabling the rule functional/immutable-data & functional/no-expression-statements.
      // They are disabled currently because the axios config must be mutated
      // since there is no a way to destructure it without having types coflict.
       
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    [getToken],
  );

  const handleRejected = useCallback(
    async (axiosError: ReadonlyDeep<AxiosError>) => {
       
      if (axiosError.response?.status === 401) {
         
        await onUnauthorized?.();
      }

      // let the error to bubble up
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw axiosError;
    },
    [onUnauthorized],
  );

  useEffect(() => {
    // clear previous interceptor to avoid having more than one interceptor to
    // inject the bearer token
     
    if (axiosInterceptor.current !== null) {
      axiosInstance.interceptors.request.eject(axiosInterceptor.current);
    }

    const interceptor = axiosInstance.interceptors.request.use(
      handleFulfilled,
      handleRejected,
    );

    // TODO: avoid mutating objects, it could lead to side-effects
     
    axiosInterceptor.current = interceptor;
  }, [axiosInstance, handleFulfilled, handleRejected]);
}
