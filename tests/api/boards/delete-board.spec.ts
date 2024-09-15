import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
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
const boardName: string = faker.string.sample();

/**
 * This test attempts to delete a board
 */
test(
  "Should delete a board",
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
    await allure.description("This test attempts to delete a board");
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
      expect(newBoard.status()).toBe(201);
    });

    const boardId: number = await newBoard.json().then((body) => body.id);

    const deletedBoard: APIResponse = await allure.step(
      `Make a DELETE request to the URL: ${url}/${boardId}`,
      async () => {
        return await request.delete(url + `/${boardId}`, {
          data: { id: boardId },
        });
      },
    );
    await allure.step("Assert status code", async () => {
      expect(deletedBoard.status()).toBe(200);
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
