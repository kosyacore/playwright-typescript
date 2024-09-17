import { test } from "@fixtures/pages-fixture";
import { faker } from "@faker-js/faker";
import { resetDatabaseApi } from "@api/reset.api";
import { createBoardApi } from "@api/boards.api";
import { createListApi } from "@api/lists.api";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import { addDays, format } from "date-fns";
import { Tag } from "@consts/tag.namespace";
import { Suite } from "@consts/suite.namespace";

/** Test data. */
const testData = {
  boardName: faker.string.sample(),
  listName: faker.string.sample(),
  cardText: faker.string.sample(),
  cardDueDate: format(addDays(new Date(), 3), "MMM dd yyyy"),
  cardIndex: 0,
};

/** SetUp. */
test.beforeAll(async () => {
  const boardId: number = await (await createBoardApi(testData.boardName)).json().then((body) => body.id);
  await createListApi(boardId, testData.listName, 0);
});

/** This test attempts to create a new card in the board list. */
test(
  "Should create a new list",
  {
    tag: [Tag.TestType.WEB, Tag.Feature.CARDS, Tag.TestSuite.REGRESSION],
  },
  async ({ mainPage, boardPage }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.WEB);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.CARDS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a new card in the board list");
    await allure.tags(Tag.TestType.WEB, Tag.Feature.CARDS, Tag.TestSuite.REGRESSION);
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", testData.boardName);
    await allure.parameter("List name", testData.listName);
    await allure.parameter("Card text", testData.cardText);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step(`Open the board with name ${testData.boardName}`, async () => {
      await mainPage.openBoard(testData.boardName);
    });
    await allure.step(
      `Add a card with text ${testData.cardText} to the list with name ${testData.listName}`,
      async () => {
        await boardPage.addCardToList(testData.listName, testData.cardText);
      },
    );
    await allure.step("Assert card creation", async () => {
      await boardPage.assertCardCreated(testData.listName, testData.cardIndex, testData.cardText, testData.cardDueDate);
    });
  },
);

/** TearDown. */
test.afterAll(async () => {
  await resetDatabaseApi();
});
