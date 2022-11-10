import { Link } from "react-router-dom";
import { selectNotes } from "src/features/notes/notesSlice";
import CreateNote from "./CreateNote";

export default () => {
  const notes = selectNotes();

  return (
    <div
      w="1/6"
      h="100vh"
      box="border"
      bg="gray-900"
      p="1rem"
      overflow="y-auto"
    >
      <div>
        <div flex="~" mb="14px">
          <p color="main-red" font="bold" text="18px">
            Notes
          </p>
          <CreateNote class="flex ml-auto my-auto rounded-full h-22px w-22px justify-center items-center">
            +
          </CreateNote>
        </div>
        <div flex="~ col" space="y-2px">
          {notes.map((note) => (
            <Link hover="op70" key={note.id} to={`/note/${note.id}`}>
              {note.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
