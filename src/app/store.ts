import notesReducer from "src/features/notes/notesSlice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { ReadonlyDeep } from "type-fest";

export const rootReducer = combineReducers({
  notes: notesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: ReadonlyDeep<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
