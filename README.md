# 🎭 Playwright Test Automation Framework (JavaScript + TypeScript)

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Allure](https://img.shields.io/badge/Allure_Report-FF6E00?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

An end-to-end test automation framework built with **Playwright Test**. It covers UI, API and network-level testing of a demo e-commerce web application, and uses the **Page Object Model** in both **JavaScript and TypeScript**. Tests run across Chromium and WebKit, produce HTML and Allure reports, and run automatically in **GitHub Actions** on every push.

---

## ✨ Key features

| Area | What's implemented |
|---|---|
| **Page Object Model** | Five page classes (Login, Dashboard, Cart, Checkout, Orders) behind a single `POManager`, written in both JS (`PageObjects/`) and TS (`PageObjects_typescript/`) |
| **Data-driven testing** | Tests iterate over JSON test data (`utils/AcademyTest_LoginTestData.json`), so one spec runs once per product |
| **Custom fixtures** | `test.extend()` fixtures inject typed test data into tests (`utils/testbase.js`, `utils_typescript/testbase.ts`) |
| **API + UI hybrid tests** | Logs in and creates orders through `APIRequestContext`, injects the auth token into local storage with `addInitScript`, then verifies the order in the UI. This skips slow UI login steps |
| **Session reuse** | Saves authenticated browser state with `storageState` and reuses it across tests |
| **Network interception** | `page.route()` with `route.fulfill()` mocks an empty-orders response, and `route.continue()` rewrites a request to test that one user can't view another user's order |
| **File upload/download** | Downloads an Excel file, edits a cell with **ExcelJS**, uploads it again, and verifies the updated value in the web table |
| **Visual testing** | Full-page and element screenshots, plus snapshot comparison with `toMatchSnapshot()` |
| **Browser handling** | Child windows, iframes, JavaScript dialogs, calendars, dropdowns, radio buttons and checkboxes |
| **Modern locators** | `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText` and `filter()` chains |
| **Cross-browser config** | `playwright.config1.js` defines **Chromium** and **WebKit** projects with retries, 2 workers, and video and trace on failure |
| **Tagging** | `@web` and `@API` tags with npm scripts to run each group on its own |
| **Reporting** | Playwright HTML report plus **Allure** (`allure-playwright`) |
| **CI/CD** | GitHub Actions workflow installs dependencies and browsers, runs the suite, and uploads the HTML report as an artifact |

## 🧰 Tech stack

| Tool | Purpose |
|---|---|
| Playwright Test | Test runner, browser automation and API testing |
| JavaScript / TypeScript | Test and page object code |
| ExcelJS | Reading and writing Excel files in tests |
| Allure | Detailed test reports |
| GitHub Actions | Continuous integration |
| Node.js / npm | Dependency management and scripts |

## 📁 Project structure

```
Playwright_automation/
├── .github/workflows/playwright.yml   # CI pipeline
├── PageObjects/                       # Page objects (JavaScript)
│   ├── POManager.js
│   ├── loginPage.js
│   ├── DashboardPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── OrdersPage.js
├── PageObjects_typescript/            # Same page objects in TypeScript
├── tests/                             # Test specs (see table below)
├── utils/
│   ├── APIUtils.js                    # Login token + create-order API helpers
│   ├── testbase.js                    # Custom fixture with test data
│   └── AcademyTest_LoginTestData.json # Data-driven test input
├── utils_typescript/testbase.ts       # Typed custom fixture
├── playwright.config.js               # Default config (Chromium)
├── playwright.config1.js              # Multi-browser config (Chromium + WebKit)
└── package.json                       # npm scripts
```

## 🧪 Test coverage

| Spec | Scenario |
|---|---|
| `EcommerceShoppingSite_POM.spec.js` / `.spec.ts` | End-to-end order flow with POM, JSON data and custom fixtures |
| `EcommerceShoppingSite_usingGetByLocators.spec.js` | Same flow written with role, label and placeholder locators |
| `WebAPITest.spec.js` | Create an order through the API, then verify it in the UI |
| `WebAPITest_usingUtils.spec.js` | API + UI test using the reusable `APIUtils` class |
| `WebAPITest_usingtoken.spec.js` | Log in once, save `storageState`, reuse the session |
| `WebAPI_NetworkTest.spec.js` | Mock the orders API response to test the "no orders" state |
| `NetworkSecurityTest.spec.js` | Rewrite a request to check that unauthorized order access is blocked |
| `UploadDownload_File.spec.js` | Excel download, edit with ExcelJS, upload and verify |
| `ScreenshotCapture_VisualTesting.spec.js` | Element and page screenshots, visual comparison |
| `CalendarAndDropdown_Test.spec.js` | Calendar picker, dialogs, iframes, hover menus (runs in parallel mode) |
| `PlaywrightBasics.spec.js` | Browser contexts, dropdowns, radio buttons, child window handling |
| `GetByLocatorsBasics.spec.js` | Form filling with Playwright's built-in locators |
| `EventCreationSite.spec.js` | Admin creates an event, user books a ticket, booking reference and seat count (decreases by 1) are verified |

## 🚀 Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/nancyabcec1058/Playwright_automation.git
cd Playwright_automation
npm install
npx playwright install
```

### Run tests

```bash
npm run regression        # all tests
npm run webtest           # only tests tagged @web
npm run APItest           # only tests tagged @API
npm run safariNewConfig   # WebKit project from playwright.config1.js

npx playwright test tests/EcommerceShoppingSite_POM.spec.js   # a single spec
npx playwright test --config playwright.config1.js --project=chrome
```

### Reports

```bash
npx playwright show-report                                   # Playwright HTML report
npx playwright test --reporter=line,allure-playwright        # write Allure results
npx allure generate ./allure-results --clean && npx allure open ./allure-report
```

Traces, screenshots and videos are kept for failed tests, so failures can be replayed step by step in the Playwright Trace Viewer.

## 🔄 Continuous integration

`.github/workflows/playwright.yml` runs on every push and pull request to `main`/`master`:

1. Checks out the code and sets up Node.js LTS
2. Runs `npm ci` and installs Playwright browsers
3. Runs the full test suite
4. Uploads `playwright-report/` as a build artifact (kept 30 days)

## 👩‍💻 Author

**Nancy**, SDET / Senior QA Automation Engineer
[GitHub](https://github.com/nancyabcec1058) · [LinkedIn](https://www.linkedin.com/in/nancy1912)

> The application under test is a public demo site built for automation practice.
