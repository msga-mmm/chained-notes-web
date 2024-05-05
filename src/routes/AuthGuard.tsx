import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

export function AuthGuard() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!isAuthenticated) {
    // eslint-disable-next-line functional/no-expression-statements
    void loginWithRedirect();
    return null;
  }

  return <Outlet />;
}
