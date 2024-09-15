import { expect, request } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";

/**
 * Reset API URL
 */
const apiUrl = playwrightConfig.use.baseURL + "/reset";

/**
 * Resetting the database (deletion of all data)
 */
export const resetDatabaseApi = async () => {
  const requestContext = await request.newContext();

  const response = await requestContext.post(apiUrl);

  expect(response.status()).toBe(204);
};
