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

/**
 * SetUp
 */
test.beforeEach(async () => {
  await createBoardApi(boardName);
});

/**
 * This test attempts to delete a board
 */
test(
  "Should delete a board",
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
    await allure.description("This test attempts to delete a board");
    await allure.tags(Tag.TestType.WEB, Tag.Feature.BOARDS, Tag.TestSuite.REGRESSION);
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step(`Open the board with name ${boardName}`, async () => {
      await mainPage.openBoard(boardName);
    });
    await allure.step("Delete the board", async () => {
      await boardPage.deleteBoard();
    });
    await allure.step("Assert board deletion", async () => {
      await mainPage.assertBoardDeleted();
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
