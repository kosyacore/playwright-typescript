import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { createBoardApi } from "@api/boards.api";
import { resetDatabaseApi } from "@api/reset.api";
import { Tag } from "@consts/tag.namespace";
import { Suite } from "@consts/suite.namespace";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const listName: string = faker.string.sample();

/**
 * SetUp
 */
test.beforeAll(async () => {
  await createBoardApi(boardName);
});

/**
 * This test attempts to add a list to the board
 */
test(
  "Should create a new list",
  {
    tag: [Tag.TestType.WEB, Tag.Feature.LISTS, Tag.TestSuite.REGRESSION],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.WEB);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.LISTS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to add a list to the board");
    await allure.tags(Tag.TestType.WEB, Tag.Feature.LISTS, Tag.TestSuite.REGRESSION);
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("List name", listName);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step(`Open the board with name ${boardName}`, async () => {
      await mainPage.openBoard(boardName);
    });
    await allure.step(`Add the list to the board with name ${listName}`, async () => {
      await boardPage.addList(listName);
    });
    await allure.step("Assert list creation", async () => {
      await boardPage.assertListCreated(0, listName);
    });
  },
);

/**
 * TearDown
 */
test.afterAll(async () => {
  await resetDatabaseApi();
});
