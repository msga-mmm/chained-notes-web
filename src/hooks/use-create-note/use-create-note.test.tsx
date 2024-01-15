import { act, renderHook } from "@testing-library/react";
import { useCreateNote } from "./use-create-note";
import { store } from "src/app/store";
import { Provider } from "react-redux";
import { selectNotes } from "src/features/notes/notesSlice";

test("creates empty note", async () => {
  const { result: notesResult } = renderHook(() => selectNotes(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  expect(notesResult.current).toHaveLength(0);

  const {
    result: createNoteResult,
  } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() => createNoteResult.current());

  expect(notesResult.current).toHaveLength(1);
  expect(notesResult.current.at(0)).toBe(note)
  expect(note).toStrictEqual({
    id: expect.any(String),
    title: "untitled",
    body: "",
  });
});
