import { expect, request } from "@playwright/test";
import playwrightConfig from "playwright.config";

/**
 * Boards API URL
 */
const apiUrl = playwrightConfig.use.baseURL + "/api/boards";

/**
 * Create a new board
 * @param boardName - name of the board
 * @returns - response object
 */
export const createBoardApi = async (boardName: string) => {
    const requestContext = await request.newContext();

    const response = await requestContext.post(apiUrl, {
        data: { name: boardName },
    });

    expect(response.status()).toBe(201);

    return response;
};

/**
 * Delete all boards
 */
export const deleteBoardsApi = async () => {
    const requestContext = await request.newContext();

    const response = await requestContext.delete(apiUrl);

    expect(response.status()).toBe(204);
};