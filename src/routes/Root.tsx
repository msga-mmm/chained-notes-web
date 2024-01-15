import Explorer from "src/components/Explorer";
import classNames from "classnames";
import { useNavigate, generatePath } from "react-router-dom";
import { AppRoutes } from "src/constants";
import { useCreateNote } from "src/hooks";

export default function Root() {
  const navigate = useNavigate();
  const createNote = useCreateNote();

  const handleNewNoteClick = () => {
    const note = createNote();
    navigate(
      generatePath(AppRoutes.note, {
        id: note.id,
      }),
    );
  };

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
        <button className="btn-main" type="button" onClick={handleNewNoteClick}>
          new note
        </button>
      </div>
    </div>
  );
}
