import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import NotePage from "./routes/NotePage";
import { AppRoutes } from "./constants";

const router = createBrowserRouter([
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
