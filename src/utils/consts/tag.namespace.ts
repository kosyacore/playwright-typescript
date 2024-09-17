/* eslint-disable @typescript-eslint/no-namespace */

/** Namespace containing tags for tagging tests in Playwright and Allure Report. */
export namespace Tag {
  /** Test type tags. */
  export enum TestType {
    API = "@api",
    WEB = "@web",
  }

  /** Test suite tags. */
  export enum TestSuite {
    SMOKE = "@smoke",
    REGRESSION = "@regression",
  }

  /** Feature tags. */
  export enum Feature {
    ONBOARDING = "@onboarding",
    AUTH = "@auth",
    SIGNUP = "@signup",
    BOARDS = "@boards",
    LISTS = "@lists",
    CARDS = "@cards",
  }
}
