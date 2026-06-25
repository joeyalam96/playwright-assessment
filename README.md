
# Playwright Automation Suite: Data-Driven Asana Board Validation

This repository contains an automated test suite designed to validate task cards, columns, and tag allocations within a project management application. 

The core engineering objective of this suite is to achieve **maximum maintainability** and **zero code duplication** by decoupling test execution logic from the underlying test data.

## Core Architectural Decisions

### 1. Data-Driven Testing (DDT) Architecture
Instead of copy-pasting the same test block six times, all test cases are stored as simple configuration objects in `testData.json`. The main test script imports this data and uses a standard `for...of` loop to generate each test case dynamically.

### 2. Semantic Scoping via Structural Relationships
The automation interface heavily utilize utility-first CSS frameworks (like Tailwind CSS). Relying on presentation classes (e.g., `.bg-gray-50`, `.p-4`) makes an automation suite highly brittle and prone to breakage during routine visual re-themes.
* **Resilience Advantage:** This suite completely avoids styling class hooks. Instead, it utilizes **Semantic Scoping**. By identifying core accessible roles (like unique `h2` and `h3` heading boundaries), matching dynamic contents with regular expressions, and stepping out to parent containers using Playwright's native parent locator (`'..'`), the selectors map directly to user-facing structures. If the layout styling changes, the tests will remain green.

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes bundled with Node.js)

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-repository-folder-name>
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install the Playwright browsers:**
   ```bash
   npx playwright install
   ```


## 🧪 Running the Tests

You can run the suite using a few different modes depending on what you want to check:

### Standard Execution (Headless)
Runs all test cases simultaneously in the background across Chromium, Firefox, and WebKit:
```bash
npx playwright test
```

### Playwright UI Mode (Interactive Debugging)
Opens Playwright's interactive dashboard. This lets you step through each action line-by-line and look at visual snapshots of what the app looked like at that exact millisecond:
```bash
npx playwright test --ui
```

### View the HTML Report
To open a breakdown of the latest test results in your browser:
```bash
npx playwright show-report
```

## 📁 Repository Structure

```text
├── tests/
│   └── asana.spec.ts      # Core testing logic and login hooks
├── testData.json          # Test case matrix driving the loop
├── playwright.config.ts   # Playwright configuration file
├── package.json           # Node dependencies and scripts
└── README.md              # Project documentation
```
