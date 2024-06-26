import { AppRoutes } from "./constants";
import { AuthGuard } from "./routes/AuthGuard";
import ErrorPage from "./routes/ErrorPage";
import NotePage from "./routes/NotePage";
import Root from "./routes/Root";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

export default function App() {
  return <RouterProvider router={router} />;
}
