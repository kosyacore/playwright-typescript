import { type Locator, type Page } from "@playwright/test";

/**
 * Base page which contains common elements for all pages
 */
export class BasePage {
  /**
   * Page elements
   */
  readonly page: Page;
  readonly loginMenu: Locator;
  readonly loggedUserButton: Locator;
  readonly notificationMessage: Locator;

  /**
   * Constructor
   * @param page - browser tab
   */
  constructor(page: Page) {
    this.page = page;

    // Elements locators
    this.loginMenu = page.getByTestId("login-menu");
    this.loggedUserButton = page.getByTestId("logged-user");
    this.notificationMessage = page.getByTestId("notification-message");
  }
}
