import {MainPage} from "@pages/main.page";
import {LoginPage} from "@pages/login.page";
import {SignupPage} from "@pages/signup.page";
import {BoardPage} from "@pages/board.page";
import { test as base } from "@playwright/test";

/**
 * Pages fixtures type
 */
interface PagesFixture {
    mainPage: MainPage;
    loginPage: LoginPage;
    signupPage: SignupPage;
    boardPage: BoardPage;
}

/**
 * Extends the base "test" object with page objects fixture
 */
export const test = base.extend<PagesFixture>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    boardPage: async ({ page }, use) => {
        await use(new BoardPage(page));
    },
});

export { expect } from "@playwright/test";
