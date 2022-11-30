import { useNavigate } from "react-router-dom";
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

interface IProps {
  children: string | JSX.Element;
  class?: string;
}

export default (props: IProps) => {
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
    <button className={props.class} btn="main" onClick={handleClick}>
      {props.children}
    </button>
  );
};
