import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import NotePage from "./routes/NotePage";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}`,
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
