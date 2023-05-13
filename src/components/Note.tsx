import { Link } from "react-router-dom";
import { INote } from "src/features/notes/notesSlice";
import Editable from "./Editable";
import classNames from "classnames";

interface IProps {
  note: INote;
  updateNote: (note: INote) => void;
}

export default function Note({ note, updateNote }: IProps) {
  return (
    <div
      className={classNames(
        "flex",
        "flex-col",
        "p-2rem",
        "w-100%",
        "h-100vh",
        "box-border",
        "overflow-y-auto"
      )}
    >
      <div className={classNames("flex", "flex-row")}>
        <Editable
          content={note.title}
          handleChange={(title) => updateNote({ ...note, title })}
          className={classNames(
            "b-none",
            "text-26px",
            "font-bold",
            "w-full",
            "focus:outline-none",
            "mb-1rem"
          )}
        />
        <Link
          to={`${import.meta.env.BASE_URL}`}
          className={classNames(
            "bg-main-red",
            "p-4px",
            "m-auto",
            "rounded-full"
          )}
        >
          <div
            className={classNames(
              "i-akar-icons:arrow-back",
              "m-5px",
              "bg-white"
            )}
          ></div>
        </Link>
      </div>
      <Editable
        content={note.body}
        handleChange={(body) => updateNote({ ...note, body })}
        className={classNames(
          "b-none",
          "text-16px",
          "h-100%",
          "box-border",
          "focus:outline-none"
        )}
      />
    </div>
  );
}
