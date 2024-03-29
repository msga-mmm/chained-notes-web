import notesReducer from "src/features/notes/notesSlice";

import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
  notes: notesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
