import {
  add,
  INote,
  INotesState,
  selectNotes,
} from "src/features/notes/notesSlice";
import { useAppDispatch } from "src/app/hooks";
import { nanoid } from "nanoid";

function newTitle(notes: INotesState) {
  let title = "untitled";

  if (notes.length > 0) {
    title += ` ${notes.length}`;
  }

  return title;
}

type CreateNoteProps = {
  title?: string;
  body?: string;
};

export function useCreateNote() {
  const dispatch = useAppDispatch();
  const notes = selectNotes();

  const createNote = ({ title, body }: CreateNoteProps = {}) => {
    const note: INote = {
      id: nanoid(),
      title: title ?? newTitle(notes),
      body: body ?? "",
    };

    dispatch(add(note));

    return note;
  };

  return createNote;
}
