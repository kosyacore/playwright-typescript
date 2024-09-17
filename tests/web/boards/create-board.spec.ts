import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { resetDatabaseApi } from "@api/reset.api";
import { Tag } from "@consts/tag.namespace";
import { Suite } from "@consts/suite.namespace";

/** Test data. */
const boardName: string = faker.string.sample();

/** This test attempts to create a board. */
test(
  "Should create a new board",
  {
    tag: [Tag.TestType.WEB, Tag.Feature.BOARDS, Tag.TestSuite.SMOKE, Tag.TestSuite.REGRESSION],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.WEB);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.BOARDS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a board");
    await allure.tags(Tag.TestType.WEB, Tag.Feature.BOARDS, Tag.TestSuite.SMOKE, Tag.TestSuite.REGRESSION);
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

/** TearDown. */
test.afterEach(async () => {
  await resetDatabaseApi();
});
