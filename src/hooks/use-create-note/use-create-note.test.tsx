import { act, renderHook } from "@testing-library/react";
import { useCreateNote } from "./use-create-note";
import { rootReducer } from "src/app/store";
import { Provider } from "react-redux";
import { selectNotes } from "src/features/notes/notesSlice";
import { configureStore } from "@reduxjs/toolkit";

test("creates empty note", async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: notesResult } = renderHook(() => selectNotes(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  expect(notesResult.current).toHaveLength(0);

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() => createNoteResult.current());

  expect(notesResult.current).toHaveLength(1);
  expect(notesResult.current.at(0)).toBe(note);
  expect(note).toStrictEqual({
    id: expect.any(String),
    title: "untitled",
    body: "",
  });
});

test("creates notes with given values", async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: notesResult } = renderHook(() => selectNotes(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  expect(notesResult.current).toHaveLength(0);

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() =>
    createNoteResult.current({
      title: "my testing title",
      body: "my testing body",
    }),
  );

  expect(notesResult.current).toHaveLength(1);
  expect(notesResult.current.at(0)).toBe(note);
  expect(note).toStrictEqual({
    id: expect.any(String),
    title: "my testing title",
    body: "my testing body",
  });
});
