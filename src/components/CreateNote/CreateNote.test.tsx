import { screen } from "@testing-library/react";
import { render } from "src/utils/test-utils";
import CreateNote from "./CreateNote";
import { userEvent } from "@testing-library/user-event";

it("finds button", () => {
  render(<CreateNote>+</CreateNote>);
  userEvent.click(screen.getByRole("button", { name: "hello" }));
});
