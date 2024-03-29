import React from "react";

interface IProps {
  children: React.JSX.Element;
  onError: (error: Error) => void;
}

export default function ErrorBoundary(props: IProps) {
  return <>{props.children}</>;
}
