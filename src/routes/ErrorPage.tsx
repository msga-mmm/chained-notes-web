import { AppRoutes } from "src/constants";

import classNames from "classnames";
import { useRouteError, Link } from "react-router";
import { ReadonlyDeep } from "type-fest";

interface IError {
  statusText?: string;
  message: string;
}

interface IErrorPage {
  error?: string;
}

export default function ErrorPage(props: ReadonlyDeep<IErrorPage>) {
  const routeError = useRouteError() as IError;
  const message = props.error || routeError.statusText || routeError.message;

  return (
    <div
      className={classNames(
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "m-auto",
        "w-full",
        "h-100vh",
      )}
    >
      <h1 className={classNames("text-35px", "font-bold", "mb-18px")}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={classNames("mt-6px")}>
        <i>{message}</i>
      </p>
      <Link to={AppRoutes.base}>
        <button
          className={classNames("btn-main", "py-.4rem", "px-1rem", "mt-2rem")}
          type="button"
        >
          home
        </button>
      </Link>
    </div>
  );
}
