
# Playwright & TypeScript

[![TypeScript](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/typescript?style=for-the-badge&logo=typescript&label=TypeScript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/%40playwright%2Ftest?style=for-the-badge&label=Playwright)](https://playwright.dev/)
[![Faker](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/%40faker-js%2Ffaker?style=for-the-badge&label=Faker)](https://fakerjs.dev/)
[![Allure Report](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/allure-playwright?style=for-the-badge&label=Allure%20Report)](https://allurereport.org/)
[![ESLint](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/eslint?style=for-the-badge&logo=eslint&label=ESLint)](https://eslint.org/)
[![Prettier](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/prettier?style=for-the-badge&logo=prettier&label=Prettier)](https://prettier.io/)
[![Husky](https://img.shields.io/github/package-json/dependency-version/kosyacore/playwright-typescript/dev/husky?style=for-the-badge&label=Husky)](https://typicode.github.io/husky/)

This is an example of a test automation project using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/) for a [Trello clone](https://github.com/filiphric/trelloapp-vue-vite-ts) site.

## Prerequisites

Make sure you have installed all the following prerequisites on your development machine:

| OS    | Prerequisite                                                           |
|-------|------------------------------------------------------------------------|
| Any   | [Trello clone app](https://github.com/filiphric/trelloapp-vue-vite-ts) |
| macOS | [Brew](https://brew.sh/)                                               |
| macOS | [Node.js](https://nodejs.org/en)                                       |

## Prepare environment

- Prepare the Trello clone app

```shell
git clone https://github.com/filiphric/trelloapp-vue-vite-ts.git
cd trelloapp-vue-vite-ts
npm install && npm start
```

## Executing The Tests

- Clone the repository

```shell
git clone https://github.com/kosyacore/playwright-typescript.git
```

- Change the directory

```shell
cd playwright-typescript
```

- Run the tests

```shell
npm install && npm run test:all
```

- Open the test run report

```shell
npm run allure:serve
```