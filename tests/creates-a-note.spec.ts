// TODO: avoid disabling eslint rule
/* eslint-disable functional/no-expression-statements */
import { test } from "@playwright/test";

test("creates a note", async ({ page }) => {
  await page.goto("/");

  // const newNoteButton = page.getByRole("button", { name: /new note/i });
  // await newNoteButton.click();

  // await expect(page).toHaveURL(/notes\/\w+/);

  // const noteTitleTextbox = page.getByRole("textbox").getByText("untitled");

  // const noteTitle = "TODO list";
  // await noteTitleTextbox.fill(noteTitle);
  // await expect(page.getByText(noteTitle)).toHaveCount(2);

  // const noteBodyTextbox = page.getByRole("textbox").nth(1);

  // const noteBody = "- Buy pencils\n- Buy notebook\n- Organize bag";
  // await noteBodyTextbox.fill(noteBody);
  // await expect(page.getByText(noteBody)).toBeVisible();
});
