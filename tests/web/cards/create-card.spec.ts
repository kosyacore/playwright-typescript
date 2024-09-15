import { test } from "@fixtures/pages-fixture";
import { faker } from "@faker-js/faker";
import { resetDatabaseApi } from "@api/reset.api";
import { createBoardApi } from "@api/boards.api";
import { createListApi } from "@api/lists.api";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const listName: string = faker.string.sample();
const cardText: string = faker.string.sample();

/**
 * SetUp
 */
test.beforeAll(async () => {
  const boardId: number = await (await createBoardApi(boardName)).json().then((body) => body.id);
  await createListApi(boardId, listName, 0);
});

/**
 *
 */
test(
  "Should create a new list",
  {
    tag: ["@web", "@cards", "@regression"],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite("WEB");
    await allure.suite("Core features");
    await allure.subSuite("Cards");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a new card in the board list");
    await allure.tags("WEB", "Board", "Smoke", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("List name", listName);
    await allure.parameter("Card text", cardText);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step(`Open the board with name ${boardName}`, async () => {
      await mainPage.openBoard(boardName);
    });
    await allure.step(`Add card to the list with text ${cardText}`, async () => {
      await boardPage.addCardToList(0, cardText);
    });
    await allure.step("Assert card creation", async () => {
      await boardPage.assertCardCreated(0, 0, cardText);
    });
  },
);

/**
 * TearDown
 */
test.afterAll(async () => {
  await resetDatabaseApi();
});
