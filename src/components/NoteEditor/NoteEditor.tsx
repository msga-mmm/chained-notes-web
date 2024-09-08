import Editable from "../Editable";
import Placeholder from "../Placeholder";

import { Note } from "src/api/chainedNotesAPI.schemas";
import { AppRoutes } from "src/constants";

import classNames from "classnames";
import { Link } from "react-router-dom";
import { ReadonlyDeep } from "type-fest";

interface IProps {
  note: Note;
  updateNote: (note: ReadonlyDeep<Note>) => void;
}

export default function NoteEditor({ note, updateNote }: ReadonlyDeep<IProps>) {
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
          handleChange={(title) => {
            updateNote({ ...note, title });
          }}
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
            "focus:outline-none",
          )}
        />

        <Link
          to={AppRoutes.base}
          className={classNames(
            "flex",
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
        handleChange={(body) => {
          updateNote({ ...note, body });
        }}
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
