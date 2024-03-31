import { useAppDispatch } from "src/app/hooks";
import {
  add,
  INote,
  INotesState,
  useNotes,
} from "src/features/notes/notesSlice";

// TODO: avoid disabling eslint rule
// eslint-disable-next-line import/namespace
import { nanoid } from "nanoid";
import { ReadonlyDeep } from "type-fest";

function newTitle(notes: ReadonlyDeep<INotesState>) {
  return notes.length > 0 ? `untitled ${notes.length.toString()}` : "untitled";
}

type CreateNoteProps = {
  title?: string;
  body?: string;
};

export function useCreateNote() {
  const dispatch = useAppDispatch();
  const notes = useNotes();

  const createNote = ({ title, body }: CreateNoteProps = {}) => {
    const note: INote = {
      id: nanoid(),
      title: title ?? newTitle(notes),
      body: body ?? "",
    };

    const { payload } = dispatch(add(note));

    return payload;
  };

  return createNote;
}
