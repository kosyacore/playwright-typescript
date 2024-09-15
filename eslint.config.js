import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules/", "report/", ".vscode/*", ".husky", "eslint.config.js"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**"],
  },
  {
    files: ["tests/**"],
    rules: {
      "playwright/expect-expect": [
        "error",
        {
          assertFunctionNames: [
            "assertBoardCreated",
            "assertBoardDeleted",
            "assertBoardRenamed",
            "assertListCreated",
            "assertCardCreated",
          ],
        },
      ],
    },
  },
];
