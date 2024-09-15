import { BasePage } from "./base.page";
import { expect, Locator, Page } from "@playwright/test";

/**
 * Board page
 */
export class BoardPage extends BasePage {
  /**
   * Page elements
   */
  readonly page: Page;
  readonly boardTitle: Locator;
  readonly starButton: Locator;
  readonly boardOptionsButton: Locator;
  readonly deleteBoardButton: Locator;
  readonly addListInput: Locator;
  readonly addListButton: Locator;
  readonly listContainer: Locator;
  readonly listName: Locator;
  readonly listOptionsButton: Locator;
  readonly newCardButton: Locator;
  readonly newCardTitleInput: Locator;
  readonly addCardButton: Locator;
  readonly cardCheckbox: Locator;
  readonly cardText: Locator;
  readonly cardDueDate: Locator;

  /**
   * Constructor
   * @param page - browser tab
   */
  constructor(page: Page) {
    super(page);
    this.page = page;

    // Elements locators
    this.boardTitle = page.getByTestId("board-title");
    this.boardOptionsButton = page.getByTestId("board-options");
    this.deleteBoardButton = page.getByTestId("delete-board");
    this.addListInput = page.getByTestId("add-list-input");
    this.addListButton = page.getByText("Add list");
    this.listContainer = page.getByTestId("list");
    this.listName = page.getByTestId("list-name");
    this.listOptionsButton = page.getByTestId("list-options");
    this.newCardButton = page.getByTestId("new-card");
    this.newCardTitleInput = page.getByPlaceholder("Enter a title for this card...");
    this.addCardButton = page.getByText("Add card");
    this.cardCheckbox = page.getByTestId("card-checkbox");
    this.cardText = page.getByTestId("card-text");
    this.cardDueDate = page.getByTestId("due-date");
  }

  // Actions

  /**
   * Renames the board
   * @param boardName - new name of the board
   */
  async renameBoard(boardName: string) {
    await this.boardTitle.click();
    await this.boardTitle.clear();
    await this.boardTitle.fill(boardName);
  }

  /**
   * Deletes the current board
   */
  async deleteBoard() {
    await this.boardOptionsButton.click();
    await this.deleteBoardButton.click();
  }

  /**
   * Adds a new list to the board
   * @param name - name of the new list
   */
  async addList(name: string) {
    await this.addListInput.fill(name);
    await this.addListInput.press("Enter");
  }

  /**
   * Adds a new card to the list
   * @param listIndex - index of the list
   * @param cardName - name of the card
   */
  async addCardToList(listIndex: number, cardName: string) {
    await this.boardTitle.click(); // defocus
    await this.newCardButton.nth(listIndex).click();
    await this.newCardTitleInput.fill(cardName);
    await this.addCardButton.click();
  }

  // Assertions

  /**
   * Asserts that the new board have been created
   * @param {string} boardName - Name of the board
   */
  async assertBoardCreated(boardName: string) {
    await expect(this.boardTitle).toHaveValue(boardName);
    await expect(this.addListInput).toBeVisible();
    await expect(this.addListButton).toBeVisible();
  }

  /**
   * Asserts that the board name has been updated
   * @param oldBoardName - old name of the board
   * @param newBoardName - new name of the board
   */
  async assertBoardRenamed(oldBoardName: string, newBoardName: string) {
    await expect(this.boardTitle).not.toHaveValue(oldBoardName);
    await expect(this.boardTitle).toHaveValue(newBoardName);
  }

  /**
   * Asserts that the list have been created in the board
   * @param listIndex - index of the list
   * @param listName - name of the list
   */
  async assertListCreated(listIndex: number, listName: string) {
    await expect(this.listName.nth(listIndex)).toHaveValue(listName);
    await expect(this.listOptionsButton.nth(listIndex)).toBeVisible();
    await expect(this.newCardButton.nth(listIndex)).toBeVisible();
  }

  /**
   * Asserts that the card have been created in the board list
   * @param listIndex - index of the list
   * @param cardIndex - index of the card
   * @param cardText - card text
   */
  async assertCardCreated(listIndex: number, cardIndex: number, cardText: string) {
    await expect(this.cardCheckbox.nth(listIndex).nth(cardIndex)).toBeVisible();
    await expect(this.cardText.nth(listIndex).nth(cardIndex)).toHaveText(cardText);
    await expect(this.cardDueDate.nth(listIndex).nth(cardIndex)).toBeVisible();
  }
}
