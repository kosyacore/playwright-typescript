import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { createBoardApi } from "@api/boards.api";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import { resetDatabaseApi } from "@api/reset.api";

/**
 * Test data
 */
const boardName = faker.string.sample();
const newBoardName = faker.string.sample();

/**
 * Set Up
 */
test.beforeEach(async () => {
  await createBoardApi(boardName);
});

/**
 * This test attempts to rename a board
 */
test(
  "Should rename a board",
  {
    tag: ["@web", "@boards", "@regression"],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite("WEB");
    await allure.suite("Core features");
    await allure.subSuite("Boards");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to rename a board");
    await allure.tags("WEB", "Boards", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("New board name", newBoardName);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step(`Open the board with name ${boardName}`, async () => {
      await mainPage.openBoard(boardName);
    });
    await allure.step("Rename the board", async () => {
      await boardPage.renameBoard(newBoardName);
    });
    await allure.step("Assert board renaming", async () => {
      await boardPage.assertBoardRenamed(boardName, newBoardName);
    });
  },
);

/**
 * Tear Down
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
