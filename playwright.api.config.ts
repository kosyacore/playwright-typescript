import { defineConfig } from "@playwright/test";

export default defineConfig({
  /* Directory that will be recursively scanned for test files. */
  testDir: "./tests/api",
  /* The maximum number of concurrent worker processes to use for parallelizing tests */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "allure-playwright",
      {
        outputFolder: "./report/allure-results",
      },
    ],
  ],
  /* The output directory for files created during test execution. */
  outputDir: "./report/test-results",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in API tests. */
    baseURL: "http://localhost:3000/api",
    /* An object containing additional HTTP headers to be sent with every request. */
    extraHTTPHeaders: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  },
});
