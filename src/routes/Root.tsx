import CreateNote from "src/components/CreateNote";
import Explorer from "src/components/Explorer";
import classNames from "classnames";

export default function Root() {
  return (
    <div className={classNames("flex", "h-100vh")}>
      <Explorer />
      <div
        className={classNames(
          "flex",
          "items-center",
          "justify-center",
          "w-full",
        )}
      >
        <CreateNote>new note</CreateNote>
      </div>
    </div>
  );
}
