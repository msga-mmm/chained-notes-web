// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */
/* eslint-disable @typescript-eslint/no-floating-promises */

import NoteEditor from "./NoteEditor";

import { Note } from "src/api/chainedNotesAPI.schemas";
import { render } from "src/utils/test-utils";

import { screen } from "@testing-library/react";

it("renders note title", () => {
  const note: Note = {
    title: "my title",
    body: "",
    id: 1,
  };

  render(<NoteEditor note={note} updateNote={() => {}} />);

  screen.getByText(note.title);
});

it("renders note body", () => {
  const note: Note = {
    title: "",
    body: "my body",
    id: 1,
  };

  render(<NoteEditor note={note} updateNote={() => {}} />);

  screen.getByText(note.body);
});

it("renders placeholder when note title is empty", () => {
  const note: Note = {
    title: "",
    body: "",
    id: 1,
  };

  render(<NoteEditor note={note} updateNote={() => {}} />);

  screen.getByText("Add a title");
});

it("renders placeholder when note body is empty", () => {
  const note: Note = {
    title: "",
    body: "",
    id: 1,
  };

  render(<NoteEditor note={note} updateNote={() => {}} />);

  screen.getByText("Type something...");
});
