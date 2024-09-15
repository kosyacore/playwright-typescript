import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

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
}