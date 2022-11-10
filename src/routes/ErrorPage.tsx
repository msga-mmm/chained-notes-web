import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

interface IError {
  statusText?: string;
  message: string;
}

interface IErrorPage {
  error?: string;
}

export default (props: IErrorPage) => {
  const routeError = useRouteError() as IError;
  const message = props.error || routeError.statusText || routeError.message;

  return (
    <div
      flex="~ col"
      justify="center"
      items="center"
      m="auto"
      w="full"
      h="100vh"
    >
      <h1 text="35px" font="bold" mb="18px">
        Oops!
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p mt="6px">
        <i>{message}</i>
      </p>
      <Link to="/">
        <button btn="main" p="y-.4rem x-1rem" m="t-2rem">
          home
        </button>
      </Link>
    </div>
  );
};
