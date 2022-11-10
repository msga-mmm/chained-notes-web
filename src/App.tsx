import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import NotePage from "./routes/NotePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/note/:id",
    element: <NotePage />,
    errorElement: <ErrorPage />,
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
