import { Link } from "react-router-dom";
import { INote } from "src/features/notes/notesSlice";
import Editable from "./Editable";
import classNames from "classnames";
import Placeholder from "./Placeholder";

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
        "overflow-y-auto",
      )}
    >
      <div className="flex mb-1rem">
        <Editable
          content={note.title}
          handleChange={(title) => updateNote({ ...note, title })}
          placeholder={
            <Placeholder>
              <p className="text-26px">Add a title</p>
            </Placeholder>
          }
          className={classNames(
            "b-none",
            "text-26px",
            "font-bold",
            "w-full",
            "focus:outline-none"
          )}
        />

        <Link
          to={`${import.meta.env.BASE_URL}`}
          className={classNames(
            "inline-flex",
            "items-center",
            "justify-center",
            "bg-main-red",
            "p-4px",
            "m-auto",
            "rounded-full",
          )}
        >
          <i
            className={classNames(
              "i-akar-icons:arrow-back",
              "m-5px",
              "color-white",
            )}
          />
        </Link>
      </div>

      <Editable
        content={note.body}
        handleChange={(body) => updateNote({ ...note, body })}
        placeholder={
          <Placeholder>
            <p>Type something...</p>
          </Placeholder>
        }
        className={classNames(
          "b-none",
          "text-16px",
          "h-100%",
          "box-border",
          "focus:outline-none",
        )}
      />
    </div>
  );
}
