import { UserInitializedProvider } from "src/providers";

import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";

export function AuthGuard() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (!isAuthenticated) {
     
    void loginWithRedirect();
    return null;
  }

  return (
    <UserInitializedProvider>
      <Outlet />
    </UserInitializedProvider>
  );
}
