import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "src/app/hooks";

export interface INote {
  id: string;
  title: string;
  body: string;
}

export type INotesState = INote[];

const initialState: INotesState = [];

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    add(state, { payload }: PayloadAction<INote>) {
      state.push(payload);
    },
    edit(state, { payload }: PayloadAction<INote>) {
      const noteIdx = state.findIndex((note) => note.id == payload.id);
      state[noteIdx] = payload;
    },
  },
});

export const selectNotes = () => useAppSelector((state) => state.notes);

export const selectNote = (id: string) =>
  selectNotes()
    .filter((note) => note.id === id)
    .at(0);

export const { add, edit } = notesSlice.actions;

export default notesSlice.reducer;
