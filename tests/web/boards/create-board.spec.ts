import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { resetDatabaseApi } from "@api/reset.api";

/**
 * Test data
 */
const boardName: string = faker.string.sample();

/**
 * This test attempts to create a board
 */
test(
  "Should create a new board",
  {
    tag: ["@web", "@boards", "@smoke", "@regression"],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite("WEB");
    await allure.suite("Core features");
    await allure.subSuite("Boards");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a board");
    await allure.tags("WEB", "Boards", "Smoke", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step("Create a new board", async () => {
      await mainPage.createNewBoard(boardName);
    });
    await allure.step("Assert board creation", async () => {
      await boardPage.assertBoardCreated(boardName);
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
