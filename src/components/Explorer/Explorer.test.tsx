// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */
/* eslint-disable @typescript-eslint/no-floating-promises */

import Explorer from "./Explorer";

import { render } from "src/utils/test-utils";

import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

// TODO: update test based in new logic depending of data from the backend
// instead of the old redux logic
it.skip("creates new note with default name 'untitled'", async () => {
  render(<Explorer />);
  const user = userEvent.setup();

  const newNoteButton = screen.getByRole("button", { name: "+" });
  await user.click(newNoteButton);

  screen.getByRole("link", { name: "untitled" });
});
