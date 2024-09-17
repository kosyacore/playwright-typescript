import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { APIResponse, expect, test } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { format } from "date-fns";
import { Suite } from "@consts/suite.namespace";
import { Tag } from "@consts/tag.namespace";

/**
 * Boards API URL
 */
const url: string = playwrightConfig.use.baseURL + "/boards";

/**
 * Test data
 */
const boardName: string = faker.string.sample();
const newBoardName: string = faker.string.sample();
const currentDate: string = format(new Date(), "yyyy-MM-dd");

/**
 * This test attempts to rename a board
 */
test(
  "Should rename a board",
  {
    tag: [Tag.TestType.API, Tag.Feature.BOARDS, Tag.TestSuite.REGRESSION],
  },
  async ({ request }) => {
    // Allure: Suite
    await allure.parentSuite(Suite.ParentSuite.API);
    await allure.suite(Suite.Suite.CORE_FEATURES);
    await allure.subSuite(Suite.SubSuite.BOARDS);

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to rename a board");
    await allure.tags(Tag.TestType.API, Tag.Feature.BOARDS, Tag.TestSuite.REGRESSION);
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.parameter("Board name", boardName);
    await allure.parameter("New board name", newBoardName);

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

    const patchedBoard: APIResponse = await allure.step(
      `Make a PATCH request to the URL: ${url}/${boardId}`,
      async () => {
        return await request.patch(url + `/${boardId}`, {
          data: {
            name: newBoardName,
          },
        });
      },
    );
    await allure.step("Assert status code", async () => {
      expect(patchedBoard.status()).toBe(200);
    });
    await allure.step("Assert response", async () => {
      expect(await patchedBoard.json()).toEqual({
        created: currentDate,
        id: boardId,
        name: newBoardName,
        starred: false,
        user: 0,
      });
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
