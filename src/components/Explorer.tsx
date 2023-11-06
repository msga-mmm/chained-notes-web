import { Link } from "react-router-dom";
import { selectNotes } from "src/features/notes/notesSlice";
import CreateNote from "./CreateNote/CreateNote";
import classNames from "classnames";

export default function Explorer() {
  const notes = selectNotes();

  return (
    <div
      className={classNames(
        "w-1/6",
        "h-100vh",
        "box-border",
        "bg-gray-900",
        "p-1rem",
        "overflow-y-auto",
      )}
    >
      <div>
        <div className={classNames("flex", "mb-14px")}>
          <p className={classNames("color-main-red", "font-bold", "text-18px")}>
            Notes
          </p>
          <CreateNote
            className={classNames(
              "flex",
              "ml-auto",
              "my-auto",
              "rounded-full",
              "h-22px",
              "w-22px",
              "justify-center",
              "items-center",
            )}
          >
            +
          </CreateNote>
        </div>
        <div className={classNames("flex", "flex-col", "space-y-2px")}>
          {notes.map((note) => (
            <Link
              className={classNames("hover-op70")}
              key={note.id}
              to={`${import.meta.env.BASE_URL}note/${note.id}/`}
            >
              {note.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
