import {faker} from "@faker-js/faker";
import {test} from "@fixtures/pages-fixture";
import {createBoardApi} from "@api/boards.api";
import {allure} from "allure-playwright";
import {Severity} from "allure-js-commons";
import {resetDatabaseApi} from "@api/reset.api";

/**
 * Test data
 */
const boardName = faker.string.sample();

/**
 * SetUp
 */
test.beforeEach(async () => {
    await createBoardApi(boardName);
});

/**
 * This test attempts to delete a board
 */
test(
    "Should delete a board",
    {
        tag: ["@web", "@boards", "@regression"],
    },
    async ({ mainPage, boardPage }) => {
        // Allure: Suite
        await allure.parentSuite("WEB");
        await allure.suite("Core features");
        await allure.subSuite("Boards");

        // Allure: Test details
        await allure.owner("Anton Klimko");
        await allure.description("This test attempts to delete a board");
        await allure.tags("WEB", "Boards", "Regression");
        await allure.severity(Severity.CRITICAL);

        // Allure: Test parameters
        await allure.parameter("Board name", boardName);

        // Test steps
        await allure.step("Open the main page", async () => {
            await mainPage.open();
        });
        await allure.step(`Open the board with name ${boardName}`, async () => {
            await mainPage.openBoard(boardName);
        });
        await allure.step("Delete the board", async () => {
            await boardPage.deleteBoard();
        });
        await allure.step("Assert board deletion", async () => {
            await mainPage.assertBoardDeleted();
        });
    },
);

/**
 * TearDown
 */
test.afterEach(async () => {
    await resetDatabaseApi();
});
