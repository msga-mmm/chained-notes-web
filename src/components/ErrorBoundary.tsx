import React from "react";

import { ReadonlyDeep } from "type-fest";

interface IProps {
  children: React.JSX.Element;
  onError: (error: ReadonlyDeep<Error>) => void;
}

export default function ErrorBoundary(props: ReadonlyDeep<IProps>) {
  return <>{props.children}</>;
}
