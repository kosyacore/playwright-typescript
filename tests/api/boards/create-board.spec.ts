import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { APIResponse, expect, test } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { format } from "date-fns";

/**
 * Boards API URL
 */
const url: string = playwrightConfig.use.baseURL + "/boards";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const currentDate: string = format(new Date(), "yyyy-MM-dd");

/**
 * This test attempts to create a board
 */
test(
  "Should create a board",
  {
    tag: ["@api", "@boards", "@smoke", "@regression"],
  },
  async ({ request }) => {
    // Allure: Suite
    await allure.parentSuite("API");
    await allure.suite("Core features");
    await allure.subSuite("Boards");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a board");
    await allure.tags("API", "Board", "Smoke", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);

    // Test steps
    const newBoard: APIResponse = await allure.step(`Make a POST request to the URL: ${url}`, async () => {
      return await request.post(url, {
        data: {
          name: boardName,
        },
      });
    });
    await allure.step("Assert status code", async () => {
      expect(newBoard.status()).toBe(201);
    });

    const boards: APIResponse = await allure.step(`Make a GET request to the URL: ${url}`, async () => {
      return await request.get(url);
    });
    await allure.step("Assert status code", async () => {
      expect(boards.status()).toBe(200);
    });
    await allure.step("Assert response", async () => {
      expect(await boards.json()).toEqual([
        {
          created: currentDate,
          id: await newBoard.json().then((body) => body.id),
          name: boardName,
          starred: false,
          user: 0,
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
