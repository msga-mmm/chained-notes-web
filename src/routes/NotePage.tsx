import ErrorPage from "./ErrorPage";

import { useAppDispatch } from "src/app/hooks";
import Explorer from "src/components/Explorer";
import Note from "src/components/Note";
import { INote, selectNotes, edit } from "src/features/notes/notesSlice";

import { useEffect, useState } from "react";

import classNames from "classnames";
import { useParams } from "react-router-dom";

export default function NotePage() {
  const { id } = useParams();
  const notes = selectNotes();
  const dispatch = useAppDispatch();

  const [note, setNote] = useState(
    notes.filter((note) => note.id === id).at(0),
  );

  const updateNote = (note: INote) => {
    setNote(note);
    dispatch(edit(note));
  };

  useEffect(() => {
    setNote(notes.filter((note) => note.id === id).at(0));
  }, [id]);

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
        {note != undefined ? (
          <Note note={note} updateNote={updateNote} key={note.id} />
        ) : (
          <ErrorPage error={`Note with id ${id} not found`} />
        )}
      </div>
    </div>
  );
}
