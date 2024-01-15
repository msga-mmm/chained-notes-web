import { act, renderHook } from "@testing-library/react";
import { useCreateNote } from "./use-create-note";
import { rootReducer } from "src/app/store";
import { Provider } from "react-redux";
import { selectNotes } from "src/features/notes/notesSlice";
import { configureStore } from "@reduxjs/toolkit";

test("adds created note into notes state", async () => {
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
  expect(notesResult.current.at(0)).toBe(note);
});

test("creates empty note", async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() => createNoteResult.current());

  expect(note).toStrictEqual({
    id: expect.any(String),
    title: "untitled",
    body: "",
  });
});

test("creates note with title and body", async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() =>
    createNoteResult.current({
      title: "my title",
      body: "my body",
    }),
  );

  expect(note).toStrictEqual({
    id: expect.any(String),
    title: "my title",
    body: "my body",
  });
});

test("creates empty note with progressive untitled names", async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() => createNoteResult.current());
  expect(note.title).toBe("untitled");

  const note2 = await act(() => createNoteResult.current());
  expect(note2.title).toBe("untitled 1");

  const note3 = await act(() => createNoteResult.current());
  expect(note3.title).toBe("untitled 2");
});
