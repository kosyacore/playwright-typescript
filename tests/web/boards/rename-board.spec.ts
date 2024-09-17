import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { createBoardApi } from "@api/boards.api";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import { resetDatabaseApi } from "@api/reset.api";
import { Suite } from "@consts/suite.namespace";
import { Tag } from "@consts/tag.namespace";

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
    tag: [Tag.TestType.WEB, Tag.Feature.BOARDS, Tag.TestSuite.REGRESSION],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.WEB);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.BOARDS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to rename a board");
    await allure.tags(Tag.TestType.WEB, Tag.Feature.BOARDS, Tag.TestSuite.REGRESSION);
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
