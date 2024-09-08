import { useAppSelector } from "src/app/hooks";

import { createSlice } from "@reduxjs/toolkit";
import { ReadonlyDeep } from "type-fest";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface INote {
  id: string;
  title: string;
  body: string;
}

export type INotesState = readonly INote[];

const initialState: INotesState = [];

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    add(state, { payload }: ReadonlyDeep<PayloadAction<INote>>) {
      return [...state, payload];
    },
    edit(state, { payload }: ReadonlyDeep<PayloadAction<INote>>) {
      return state.map((note) => (note.id === payload.id ? payload : note));
    },
  },
});

export const useNotes = () => useAppSelector((state) => state.notes);

export const { add } = notesSlice.actions;

export default notesSlice.reducer;
