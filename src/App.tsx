import { AppRoutes } from "./constants";
import { AuthGuard } from "./routes/AuthGuard";
import ErrorPage from "./routes/ErrorPage";
import NotePage from "./routes/NotePage";
import Root from "./routes/Root";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
      {
        path: AppRoutes.base,
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: AppRoutes.note,
        element: <NotePage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
