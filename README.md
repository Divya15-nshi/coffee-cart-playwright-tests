# coffee-cart-playwright-tests
Automated end-to-end testing suite for a Coffee Cart web application using Playwright. This project automates the testing of key user flows to ensure stability, reliability, and performance.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Scenarios Covered](#test-scenarios-covered)
- [Playwright Report](#playwright-report)
- [Contributing](#contributing)
- [License](#license)

  ## 🚀 Live Demo
Currently, this project does not have a live hosted demo.  
You can run the tests locally by following the [Installation](#installation) and [Running-Tests](#running-tests) instructions below.

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Divya15-nshi/coffee-cart-playwright-tests.git
   cd coffee-cart-playwright-tests
Install dependencies:
```bash
npm install
Install Playwright browsers:
```bash
npx playwright install

📁 Project Structure
```bash
coffee-cart-playwright-tests/
├── tests/                # Test cases
├── pages/                # Page Object Models (POM)
├── fixtures/             # Shared test data/config
├── playwright.config.ts  # Playwright configuration file
├── package.json          # NPM scripts & dependencies
└── README.md             # Project documentation

🧪 Running Tests
Run all tests:
```bash
npx playwright test
Run a specific test file:
```bash
npx playwright test tests/<filename>.ts
Run with Playwright Test UI:
```bash
npx playwright test --ui

✅ Test Scenarios Covered
Adding items to the cart

Updating item quantities

Removing items from the cart

Placing an order

Validating empty cart behavior

Checking for correct price calculation

user can perform extra actions apart from usual add to cart flows.

📊 Playwright Report
To view the latest HTML test report:
```bash
npx playwright show-report

🤝 Contributing
Contributions are welcome!
Please fork the repo, create a branch, make your changes, and open a pull request. Make sure your code is well-tested and documented.

📄 License
This project is licensed under the MIT License.

