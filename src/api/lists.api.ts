import { expect, request } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";

/**
 * Lists API URL
 */
const apiUrl = playwrightConfig.use.baseURL + "/lists";

/**
 * Create a new list in the board
 * @param boardId - the id of the board
 * @param listName - the name of the list
 * @param order - the order of the list
 * @returns - response object
 */
export const createListApi = async (boardId: number, listName: string, order: number) => {
  const requestContext = await request.newContext();

  const response = await requestContext.post(apiUrl, {
    data: { boardId: boardId, name: listName, order: order },
  });

  expect(response.status()).toBe(201);

  return await response.json();
};
