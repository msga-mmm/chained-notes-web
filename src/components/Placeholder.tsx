import { ReactNode } from "react";

import { ReadonlyDeep } from "type-fest";

type PlaceholderProps = {
  children: ReactNode;
};

/**
 * Reference:
 *
 * https://github.com/facebook/lexical/blob/0f7c78b24dec932c9e1629623bedaf4485eacb08/packages/lexical-playground/src/ui/Placeholder.tsx
 * https://github.com/facebook/lexical/blob/0f7c78b24dec932c9e1629623bedaf4485eacb08/packages/lexical-playground/src/ui/Placeholder.css
 */
export default function Placeholder({
  children,
}: ReadonlyDeep<PlaceholderProps>) {
  return (
    <div
      className={
        "absolute opacity-70 select-none pointer-events-none inline-block overflow-hidden"
      }
    >
      {children}
    </div>
  );
}
