import { resetDatabaseApi } from "@api/reset.api";
import { APIResponse, expect, test } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";

/**
 * Boards API URL
 */
const url: string = playwrightConfig.use.baseURL + "/boards";

/**
 * Test data
 */
const boardName = "";

/**
 * This test attempts to create a new board with an empty board name
 */
test(
  "Should not create a board with an empty board name",
  {
    tag: ["@api", "@boards", "@regression"],
  },
  async ({ request }) => {
    // Allure: Suite
    await allure.parentSuite("API");
    await allure.suite("Core features");
    await allure.subSuite("Boards");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to create a new board with an empty board name");
    await allure.tags("API", "Board", "Regression");
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
      expect(newBoard.status()).toBe(400);
    });
    await allure.step("Assert error message", async () => {
      expect(await newBoard.json().then((body) => body.error)).toEqual("You need to provide 'name' in request body.");
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
