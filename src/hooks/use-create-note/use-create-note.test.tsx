import { useCreateNote } from "./use-create-note";

import { rootReducer } from "src/app/store";
import { useNotes } from "src/features/notes/notesSlice";

import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";

test("adds created note into notes state", { concurrent: true }, async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  const { result: notesResult } = renderHook(() => useNotes(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  expect(notesResult.current).toHaveLength(0);

  const { result: createNoteResult } = renderHook(() => useCreateNote(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  const note = await act(() => createNoteResult.current());
  expect(notesResult.current.at(0)).toBe(note);
});

test("creates empty note", { concurrent: true }, async () => {
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

test("creates note with title and body", { concurrent: true }, async () => {
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

test(
  "creates empty notes with progressive untitled names",
  { concurrent: true },
  async () => {
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
  },
);
