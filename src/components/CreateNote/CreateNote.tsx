import { useNavigate } from "react-router-dom";
import {
  add,
  INote,
  INotesState,
  selectNotes,
} from "src/features/notes/notesSlice";
import { useAppDispatch } from "src/app/hooks";
import { nanoid } from "nanoid";
import classNames from "classnames";

function newTitle(notes: INotesState) {
  let title = "untitled";

  if (notes.length > 0) {
    title += ` ${notes.length}`;
  }

  return title;
}

interface IProps {
  children: string | JSX.Element;
  className?: string;
}

export default function CreateNote(props: IProps) {
  const dispatch = useAppDispatch();
  const notes = selectNotes();
  const navigate = useNavigate();

  const handleClick = () => {
    const note: INote = {
      id: nanoid(),
      title: newTitle(notes),
      body: "",
    };
    dispatch(add(note));
    navigate(`${import.meta.env.BASE_URL}note/${note.id}`);
  };

  return (
    <button
      className={classNames(props.className, "btn-main")}
      type="button"
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}
