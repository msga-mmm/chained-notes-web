import { Link } from "react-router-dom";
import { INote } from "src/features/notes/notesSlice";
import Editable from "./Editable";

interface IProps {
  note: INote;
  updateNote: (note: INote) => void;
}

export default ({ note, updateNote }: IProps) => {
  return (
    <div
      flex="~ col"
      p="2rem"
      w="100%"
      h="100vh"
      box="border"
      overflow="y-auto"
    >
      <div flex="~ row">
        <Editable
          content={note.title}
          handleChange={(title) => updateNote({ ...note, title })}
          class="b-none text-26px font-bold w-full focus:outline-none mb-1rem"
        />
        <Link to={`${import.meta.env.BASE_URL}`} bg="main-red" p="4px" m="auto" rounded="full">
          <div className="i-akar-icons:arrow-back" m="5px" bg="white"></div>
        </Link>
      </div>
      <Editable
        content={note.body}
        handleChange={(body) => updateNote({ ...note, body })}
        class="b-none text-16px h-100% box-border focus:outline-none"
      />
    </div>
  );
};
