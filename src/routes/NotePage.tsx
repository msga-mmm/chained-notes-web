import ErrorPage from "./ErrorPage";

import { useAppDispatch } from "src/app/hooks";
import Explorer from "src/components/Explorer/Explorer";
import Note from "src/components/Note/Note";
import { INote, useNotes, edit } from "src/features/notes/notesSlice";

import { useEffect, useState } from "react";

import classNames from "classnames";
import { useParams } from "react-router-dom";
import { ReadonlyDeep } from "type-fest";

export default function NotePage() {
  const { id } = useParams();
  const notes = useNotes();
  const dispatch = useAppDispatch();

  const [note, setNote] = useState(
    notes.filter((note) => note.id === id).at(0),
  );

  const updateNote = (note: ReadonlyDeep<INote>) => {
    setNote(note);
    const { payload } = dispatch(edit(note));
    return payload;
  };

  useEffect(() => {
    setNote(notes.filter((note) => note.id === id).at(0));
  }, [id, notes]);

  return (
    <div className={classNames("flex", "min-h-100vh")}>
      <Explorer />
      <div
        className={classNames(
          "flex",
          "w-full",
          "justify-center",
          "items-center",
        )}
      >
        {note !== undefined ? (
          <Note note={note} updateNote={updateNote} key={note.id} />
        ) : (
          <ErrorPage error={`Note with id ${id} not found`} />
        )}
      </div>
    </div>
  );
}
