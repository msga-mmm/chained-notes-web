// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */
import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

// TODO: move this assertion to a playwright global setup, like setup.test.ts
// Assertion on all the tests to make sure there are no warnings or errors
test.beforeEach(async ({ page }) => {
  page.on("console", (message) => {
    if (
      message.type() === "error"
      // TODO: uncomment warnings check and fix them
      // || message.type() === 'warning'
    ) {
      throw new Error(`Console ${message.type()}: ${message.text()}`);
    }
  });
});

// TODO: test skipped temporally while migrating from redux notes store logic
// to backend-based
test("creates a note", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Sign up" }).click();

  await page
    .getByLabel("Email address")
    .fill(faker.internet.email({ provider: "chained-notes.com" }));
  await page.getByLabel("Password").fill(faker.internet.password());
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.getByRole("button", { name: "Accept" }).click();

  const newNoteButton = page.getByRole("button", { name: /new note/i });
  await newNoteButton.click();

  await expect(page).toHaveURL(/notes\/\w+/);

  const noteTitleTextbox = page.getByRole("textbox").getByText("untitled");

  const noteTitle = "TODO list";
  await noteTitleTextbox.fill(noteTitle);
  await expect(page.getByText(noteTitle)).toHaveCount(2);

  const noteBodyTextbox = page.getByRole("textbox").nth(1);

  const noteBody = "- Buy pencils\n- Buy notebook\n- Organize bag";
  await noteBodyTextbox.fill(noteBody);
  await expect(page.getByText(noteBody)).toBeVisible();
});
