// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */

import Note from "./Note";

import { render } from "src/utils/test-utils";

import { screen } from "@testing-library/react";

it("renders note title", () => {
  const note = {
    title: "my title",
    body: "",
    id: "",
  };

  render(<Note note={note} updateNote={() => {}} />);

  screen.getByText(note.title);
});

it("renders note body", () => {
  const note = {
    title: "",
    body: "my body",
    id: "",
  };

  render(<Note note={note} updateNote={() => {}} />);

  screen.getByText(note.body);
});

it("renders placeholder when note title is empty", () => {
  const note = {
    title: "",
    body: "",
    id: "",
  };

  render(<Note note={note} updateNote={() => {}} />);

  screen.getByText("Add a title");
});

it("renders placeholder when note body is empty", () => {
  const note = {
    title: "",
    body: "",
    id: "",
  };

  render(<Note note={note} updateNote={() => {}} />);

  screen.getByText("Type something...");
});
