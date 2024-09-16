import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { APIResponse, expect, test } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { format } from "date-fns";

/**
 * Lists API URL
 */
const url = playwrightConfig.use.baseURL + "/lists";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const listName: string = faker.string.sample();
const currentDate: string = format(new Date(), "yyyy-MM-dd");

let board: APIResponse;

/**
 * SetUp
 */
test.beforeEach(async ({ request }) => {
  board = await request.post(playwrightConfig.use.baseURL + "boards", {
    data: {
      name: boardName,
    },
  });
});

/**
 * This test attempts to create a new list in the board
 */
test(
  "Should create a new list in the board",
  {
    tag: ["@api", "@lists", "@smoke", "@regression"],
  },
  async ({ request }) => {
    // Allure: Suite
    await allure.parentSuite("API");
    await allure.suite("Core features");
    await allure.subSuite("Lists");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a list in the board");
    await allure.tags("API", "Lists", "Smoke", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("List name", listName);

    // Test steps
    const boardId = await board.json().then((body) => body.id);

    const newList: APIResponse = await allure.step(`Make a POST request to the URL: ${url}`, async () => {
      return await request.post(url, {
        data: {
          boardId: boardId,
          name: listName,
          order: 0,
        },
      });
    });
    await allure.step("Assert status code", async () => {
      expect(newList.status()).toBe(201);
    });

    const lists: APIResponse = await allure.step(
      `Make a GET request to the URL: ${url}?boardId=${boardId}`,
      async () => {
        return await request.get(url);
      },
    );
    await allure.step("Assert status code", async () => {
      expect(lists.status()).toBe(200);
    });
    await allure.step("Assert response", async () => {
      expect(await lists.json()).toEqual([
        {
          boardId: boardId,
          name: listName,
          order: 0,
          created: currentDate,
          id: await newList.json().then((body) => body.id),
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
