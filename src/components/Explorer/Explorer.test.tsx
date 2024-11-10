// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */

import Explorer from "./Explorer";

import {
  getApiNotesCreateMockHandler,
  getApiNotesListMockHandler,
  getApiNotesRetrieveResponseMock,
} from "src/api/chainedNotesAPI.msw";
import { Note } from "src/api/chainedNotesAPI.schemas";
import { render } from "src/utils/test-utils";

import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";

const server = setupServer();

// establish API mocking before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => {
  server.resetHandlers();
});

// clean up once the tests are done
afterAll(() => {
  server.close();
});

it("creates new note with default name 'untitled'", async () => {
  const note: Note = getApiNotesRetrieveResponseMock({
    title: "untitled",
  });

  server.use(
    getApiNotesCreateMockHandler(),
    getApiNotesListMockHandler([note]),
  );

  render(<Explorer />);
  const user = userEvent.setup();

  const newNoteButton = screen.getByRole("button", { name: "+" });
  await user.click(newNoteButton);

  await screen.findByRole("link", { name: "untitled" });
});
