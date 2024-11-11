import ErrorPage from "./ErrorPage";

import {
  getNotesListQueryKey,
  useNotesUpdate,
  useNotesRetrieve,
} from "src/api/chainedNotesAPI";
import { Note } from "src/api/chainedNotesAPI.schemas";
import Explorer from "src/components/Explorer/Explorer";
import NoteEditor from "src/components/NoteEditor/NoteEditor";
import { NoteProvider } from "src/providers/NoteProvider";

import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { ReadonlyDeep } from "type-fest";

export default function NotePage() {
  const { id } = useParams();
  const { data: note } = useNotesRetrieve(Number(id));
  const { mutate: updateNote } = useNotesUpdate({
    mutation: {
      onSuccess: async () => {
        return queryClient.invalidateQueries({
          queryKey: getNotesListQueryKey(),
        });
      },
    },
  });

  const queryClient = useQueryClient();

  const handleNoteUpdate = (note: ReadonlyDeep<Note>) => {
    updateNote({
      id: note.id,
      data: {
        body: note.body,
        title: note.title,
      },
    });
  };

  if (id === undefined) {
    return null;
  }

  return (
    <NoteProvider noteId={id}>
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
            <NoteEditor
              note={note}
              updateNote={handleNoteUpdate}
              key={note.id}
            />
          ) : (
            <ErrorPage error={`Note with id ${id} not found`} />
          )}
        </div>
      </div>
    </NoteProvider>
  );
}
