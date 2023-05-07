interface IProps {
  children: JSX.Element;
  onError: (error: Error) => void;
}

export default function ErrorBoundary(props: IProps) {
  return <>{props.children}</>;
}
