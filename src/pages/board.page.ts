import { BasePage } from "./base.page";
import { expect, Locator, Page } from "@playwright/test";

/** Board page. */
export class BoardPage extends BasePage {
  /** Page elements. */
  readonly page: Page;
  readonly boardTitle: Locator;
  readonly starButton: Locator;
  readonly boardOptionsButton: Locator;
  readonly deleteBoardButton: Locator;
  readonly addListInput: Locator;
  readonly addListButton: Locator;
  readonly listContainer: Locator;
  readonly listNameInput: Locator;
  readonly listOptionsButton: Locator;
  readonly newCardButton: Locator;
  readonly newCardTitleInput: Locator;
  readonly addCardButton: Locator;
  readonly cardContainer: Locator;
  readonly cardCheckbox: Locator;
  readonly cardText: Locator;
  readonly cardDueDate: Locator;

  /**
   * Constructor.
   * @param page - Browser tab.
   */
  constructor(page: Page) {
    super(page);
    this.page = page;

    // Elements locators
    this.boardTitle = page.getByTestId("board-title");
    this.starButton = page.getByTestId("star");
    this.boardOptionsButton = page.getByTestId("board-options");
    this.deleteBoardButton = page.getByTestId("delete-board");
    this.addListInput = page.getByTestId("add-list-input");
    this.addListButton = page.getByText("Add list");
    this.listContainer = page.getByTestId("list");
    this.listNameInput = page.getByTestId("list-name");
    this.listOptionsButton = page.getByTestId("list-options");
    this.newCardButton = page.getByTestId("new-card");
    this.newCardTitleInput = page.getByPlaceholder("Enter a title for this card...");
    this.addCardButton = page.getByText("Add card");
    this.cardContainer = page.getByTestId("card");
    this.cardCheckbox = page.getByTestId("card-checkbox");
    this.cardText = page.getByTestId("card-text");
    this.cardDueDate = page.getByTestId("due-date");
  }

  // Actions

  /**
   * Renames the board.
   * @param boardName - New name of the board.
   */
  async renameBoard(boardName: string) {
    await this.boardTitle.click();
    await this.boardTitle.clear();
    await this.boardTitle.fill(boardName);
  }

  /** Deletes the current board. */
  async deleteBoard() {
    await this.boardOptionsButton.click();
    await this.deleteBoardButton.click();
  }

  /**
   * Adds a new list to the board.
   * @param name - Name of the new list.
   */
  async addList(name: string) {
    await this.addListInput.fill(name);
    await this.addListInput.press("Enter");
  }

  /**
   * Adds a new card to the list in the board.
   * @param listName - Name of the list for adding a card.
   * @param cardText - Text of the card.
   */
  async addCardToList(listName: string, cardText: string) {
    await this.boardTitle.click(); // defocus
    await this.listContainer.all().then(async (lists) => {
      for (const list of lists) {
        if ((await list.locator(this.listNameInput).inputValue()) === listName) {
          await list.locator(this.newCardButton).click();
          await list.locator(this.newCardTitleInput).fill(cardText);
          await list.locator(this.addCardButton).click();
          break;
        }
      }
    });
  }

  // Assertions

  /**
   * Asserts that the new board have been created.
   * @param {string} boardName - Name of the board.
   */
  async assertBoardCreated(boardName: string) {
    await expect(this.boardTitle).toHaveValue(boardName);
    await expect(this.addListInput).toBeVisible();
    await expect(this.addListButton).toBeVisible();
  }

  /**
   * Asserts that the board name has been updated.
   * @param oldBoardName - Old name of the board.
   * @param newBoardName - New name of the board.
   */
  async assertBoardRenamed(oldBoardName: string, newBoardName: string) {
    await expect(this.boardTitle).not.toHaveValue(oldBoardName);
    await expect(this.boardTitle).toHaveValue(newBoardName);
  }

  /**
   * Asserts that the list have been created in the board.
   * @param listIndex - Index of the list.
   * @param listName - Name of the list.
   */
  async assertListCreated(listIndex: number, listName: string) {
    await expect(this.listNameInput.nth(listIndex)).toHaveValue(listName);
    await expect(this.listOptionsButton.nth(listIndex)).toBeVisible();
    await expect(this.newCardButton.nth(listIndex)).toBeVisible();
  }

  /**
   * Asserts that the card have been created in the board list.
   * @param listName - Name of the list in which the card is located.
   * @param cardIndex - Index of the card in the list.
   * @param cardText - Text of the card to assert.
   * @param cardDueDate - Card due date to assert.
   */
  async assertCardCreated(listName: string, cardIndex: number, cardText: string, cardDueDate: string) {
    await this.listContainer.all().then(async (lists) => {
      for (const list of lists) {
        if ((await list.locator(this.listNameInput).inputValue()) === listName) {
          await expect(list.locator(this.cardContainer).nth(cardIndex).locator(this.cardCheckbox)).toBeVisible();
          await expect(list.locator(this.cardContainer).nth(cardIndex).locator(this.cardText)).toHaveText(cardText);
          await expect(list.locator(this.cardContainer).nth(cardIndex).locator(this.cardDueDate)).toBeVisible();
          await expect(list.locator(this.cardContainer).nth(cardIndex).locator(this.cardDueDate)).toHaveText(
            cardDueDate,
          );
          break;
        }
      }
    });
  }
}
