/* eslint-disable @typescript-eslint/no-namespace */

/** Namespace containing suite names for Allure Report. */
export namespace Suite {
  /** Parent suite names. */
  export enum ParentSuite {
    API = "API",
    WEB = "WEB",
  }

  /** Suite names. */
  export enum Suite {
    CORE_FEATURES = "Core features",
  }

  /** Sub suite names. */
  export enum SubSuite {
    ONBOARDING = "Onboarding",
    BOARDS = "Boards",
    LISTS = "Lists",
    CARDS = "Cards",
  }
}
