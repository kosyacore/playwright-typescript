import { BasePage } from "./base.page";
import { Locator, Page } from "@playwright/test";

/**
 * Signup page
 */
export class SignupPage extends BasePage {
  /**
   * Page elements
   */
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeEmailCheckbox: Locator;

  /**
   * Constructor
   * @param page - browser tab
   */
  constructor(page: Page) {
    super(page);
    this.page = page;

    // Elements locators
    this.emailInput = page.getByTestId("signup-email");
    this.passwordInput = page.getByTestId("signup-password");
    this.loginButton = page.getByTestId("signup-submit");
    this.welcomeEmailCheckbox = page.locator("//input[@name='welcomeEmail']");
  }

  // Actions

  /**
   * Signup with the specified user data
   * @param email - user email
   * @param password - user password
   * @param sendEmail - optional parameter, send email to user after successful signup
   */
  async signUp(email: string, password: string, sendEmail?: boolean) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    if (sendEmail) {
      await this.welcomeEmailCheckbox.check();
    }

    await this.loginButton.click();
  }
}
