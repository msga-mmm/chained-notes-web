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
  {
    path: `${import.meta.env.BASE_URL}note/:id/`,
    element: <NotePage />,
    errorElement: <ErrorPage />,
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
