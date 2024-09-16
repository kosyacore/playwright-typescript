import { resetDatabaseApi } from "@api/reset.api";
import { faker } from "@faker-js/faker";
import { test } from "@fixtures/pages-fixture";
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";

/**
 * Test data
 */
const user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

/**
 * This test attempts to signup
 */
test(
  "Should signup with correct data",
  {
    tag: ["@web", "@onboarding", "@signup", "@smoke", "@regression"],
  },
  async ({ mainPage, loginPage, signupPage }) => {
    // Allure: Suite
    await allure.parentSuite("WEB");
    await allure.suite("Core features");
    await allure.subSuite("Onboarding");

    // Allure: Test details
    await allure.owner("Anton Klimko");
    await allure.description("This test attempts to signup");
    await allure.tags("WEB", "Onboarding", "Signup", "Smoke", "Regression");
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
    await allure.step("Navigate to the signup page", async () => {
      await loginPage.signupButton.click();
    });
    await allure.step(`Sign up with correct user data, email: ${user.email} password: ${user.password}`, async () => {
      await signupPage.signUp(user.email, user.password);
    });
    await allure.step("Assert user is logged in", async () => {
      await mainPage.assertUserLoggedIn(user.email);
    });
  },
);

/**
 * TearDown
 */
test.afterAll(async () => {
  await resetDatabaseApi();
});
