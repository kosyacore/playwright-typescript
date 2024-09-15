import {BasePage} from "./base.page";
import {Locator, Page} from "@playwright/test";

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
}