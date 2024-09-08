import { createContext, ReactNode, useMemo } from "react";

import { ReadonlyDeep } from "type-fest";

type NoteContextValue = {
  /**
   * ID of the note.
   */
  noteId: string;
};

const NoteContext = createContext<Partial<NoteContextValue>>({});

type NoteProviderProps = {
  noteId: string;
  children: ReactNode;
};

export function NoteProvider({
  noteId,
  children,
}: ReadonlyDeep<NoteProviderProps>) {
  const value: NoteContextValue = useMemo(
    () => ({
      noteId,
    }),
    [noteId],
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}
