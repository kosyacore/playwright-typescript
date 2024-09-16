import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Main page
 */
export class MainPage extends BasePage {
  /**
   * Page elements
   */
  readonly page: Page;
  readonly boardList: Locator;
  readonly newBoardInput: Locator;
  readonly boardItem: Locator;

  /**
   * Constructor
   * @param page - browser tab
   */
  constructor(page: Page) {
    super(page);

    // Elements locators
    this.page = page;
    this.boardList = page.getByTestId("board-list");
    this.newBoardInput = page.getByTestId("first-board");
    this.boardItem = page.getByTestId("board-item");
  }

  // Actions

  /**
   * Open the main page
   */
  async open() {
    await this.page.goto("/");
  }

  /**
   * Creates a board
   * @param {string} boardName - name of the board
   */
  async createNewBoard(boardName: string) {
    await this.newBoardInput.fill(boardName);
    await this.newBoardInput.press("Enter");
  }

  /**
   * Open a board
   * @param {string} boardName - name of the board
   */
  async openBoard(boardName: string) {
    await this.boardItem.filter({ hasText: boardName }).first().click();
  }

  // Assertions

  /**
   * Asserts that board have been deleted
   */
  async assertBoardDeleted() {
    await expect(this.notificationMessage).toBeVisible();
    await expect(this.notificationMessage).toHaveText("Board was deleted");
    await expect(this.newBoardInput).toBeVisible();
  }

  /**
   * Asserts that the user has logged in
   * @param email - user email
   */
  async assertUserLoggedIn(email: string) {
    await expect(this.loggedUserButton).toBeVisible();
    await expect(this.loggedUserButton).toHaveText(email);
    await expect(this.loginMenu).not.toBeVisible();
    await expect(this.newBoardInput).toBeVisible();
  }
}
