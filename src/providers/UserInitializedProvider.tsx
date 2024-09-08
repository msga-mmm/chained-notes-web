import { useInjectTokenToAxiosInstance } from "src/hooks";
import { AXIOS_INSTANCE } from "src/orval/custom-axios-instance";

import { ReactNode } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { ReadonlyDeep } from "type-fest";

type UserInitializedProviderProps = {
  children: ReactNode;
};

/**
 * Provider that performs necessary actions before the user is shown in the app.
 */
export function UserInitializedProvider({
  children,
}: ReadonlyDeep<UserInitializedProviderProps>) {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  useInjectTokenToAxiosInstance({
    axiosInstance: AXIOS_INSTANCE,
    getToken: getAccessTokenSilently,
    onUnauthorized: loginWithRedirect,
  });

  return children;
}
