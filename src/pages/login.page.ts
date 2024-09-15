import {BasePage} from "./base.page";
import {Locator, Page} from "@playwright/test";

/**
 * Login page
 */
export class LoginPage extends BasePage {
    /**
     * Page elements
     */
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly signupButton: Locator;

    /**
     * Constructor
     * @param page - browser tab
     */
    constructor(page: Page) {
        super(page);

        // Elements locators
        this.page = page;
        this.emailInput = page.getByTestId("login-email");
        this.passwordInput = page.getByTestId("login-password");
        this.loginButton = page.getByTestId("login-submit");
        this.signupButton = page.locator("//a[@href='/signup']");
    }
    }