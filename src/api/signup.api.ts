import { expect, request } from "@playwright/test";
import playwrightConfig from "@playwrightApiConfig";

/**
 * Signup API URL
 */
const apiUrl = playwrightConfig.use.baseURL + "/signup";

/**
 * Creates a user with the specified credentials
 * @param email - email of the user
 * @param password - password of the user
 * @returns - response object
 */
export const createUserApi = async (email: string, password: string) => {
  const requestContext = await request.newContext();

  const response = await requestContext.post(apiUrl, {
    data: { email: email, password: password },
  });

  expect(response.status()).toBe(201);

  return response;
};
