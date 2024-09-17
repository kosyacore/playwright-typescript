import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { APIResponse, expect, test } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { addDays, format } from "date-fns";
import { Tag } from "@consts/tag.namespace";
import { Suite } from "@consts/suite.namespace";

/**
 * Cards API URL
 */
const url = playwrightConfig.use.baseURL + "/cards";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const listName: string = faker.string.sample();
const cardText: string = faker.string.sample();
const currentDate: string = format(new Date(), "yyyy-MM-dd");
const deadlineDate: string = format(addDays(new Date(), 3), "yyyy-MM-dd");

let board: APIResponse;
let list: APIResponse;

/**
 * SetUp
 */
test.beforeEach(async ({ request }) => {
  board = await request.post(playwrightConfig.use.baseURL + "/boards", {
    data: {
      name: boardName,
    },
  });
  list = await request.post(playwrightConfig.use.baseURL + "/lists", {
    data: {
      boardId: await board.json().then((body) => body.id),
      name: listName,
      order: 0,
    },
  });
});

/**
 * This test attempts to create a new card in the board list
 */
test(
  "Should create a new card in the board list",
  {
    tag: [Tag.TestType.API, Tag.Feature.CARDS, Tag.TestSuite.SMOKE, Tag.TestSuite.REGRESSION],
  },
  async ({ request }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.API);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.CARDS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a card in the board list");
    await allure.tags(Tag.TestType.API, Tag.Feature.CARDS, Tag.TestSuite.SMOKE, Tag.TestSuite.REGRESSION);
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("List name", listName);
    await allure.parameter("Card text", cardText);

    // Test steps
    const boardId = await board.json().then((body) => body.id);
    const listId = await list.json().then((body) => body.id);

    const newCard: APIResponse = await allure.step(`Make a POST request to the URL: ${url}`, async () => {
      return await request.post(url, {
        data: {
          boardId: boardId,
          listId: listId,
          name: cardText,
          order: 0,
        },
      });
    });
    await allure.step("Assert status code", async () => {
      expect(newCard.status()).toBe(201);
    });

    const cards: APIResponse = await allure.step(`Make a GET request to the URL: ${url}?listId=${listId}`, async () => {
      return await request.get(url + `?listId=${listId}`);
    });
    await allure.step("Assert status code", async () => {
      expect(cards.status()).toBe(200);
    });
    await allure.step("Assert response", async () => {
      expect(await cards.json()).toEqual([
        {
          boardId: boardId,
          completed: false,
          created: currentDate,
          deadline: deadlineDate,
          description: "",
          id: await newCard.json().then((body) => body.id),
          listId: listId,
          name: cardText,
          order: 0,
        },
      ]);
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
