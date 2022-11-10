interface IProps {
  children: JSX.Element;
  onError: (error: Error) => void;
}

export default (props: IProps) => {
  return <>{props.children}</>;
};
