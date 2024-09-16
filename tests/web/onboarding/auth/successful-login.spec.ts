import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import { createUserApi } from "@api/signup.api";

/**
 * Test data
 */
const user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

/**
 * SetUp
 */
test.beforeEach(async () => {
  await createUserApi(user.email, user.password);
});

/**
 * This test attempts to log in with the correct user data
 */
test(
  "Should login with correct data",
  { tag: ["@web", "@onboarding", "@auth", "@smoke", "@regression"] },
  async ({ mainPage, loginPage }) => {
    // Allure: Suite
    await allure.parentSuite("WEB");
    await allure.suite("Core features");
    await allure.subSuite("Onboarding");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to log in with the correct user data");
    await allure.tags("WEB", "Onboarding", "Auth", "Smoke", "Regression");
    await allure.severity(Severity.CRITICAL);

    // Allure: Test parameters
    await allure.addParameter("email", user.email);
    await allure.addParameter("password", user.password);

    // Test steps
    await allure.step("Open the main page", async () => {
      await mainPage.open();
    });
    await allure.step("Navigate to the login page", async () => {
      await mainPage.loginMenu.click();
    });
    await allure.step(`Login with correct user data, email: ${user.email} password: ${user.password}`, async () => {
      await loginPage.login(user.email, user.password);
    });
    await allure.step("Assert user is logged in", async () => {
      await mainPage.assertUserLoggedIn(user.email);
    });
  },
);

/**
 * TearDown
 */
test.afterEach(async () => {
  await resetDatabaseApi();
});
