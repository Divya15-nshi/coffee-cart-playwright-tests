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
2. Install dependencies:
   npm install
3. Install Playwright (includes browsers):
   npx playwright install
📁 Project Structure
   coffee-cart-playwright-tests/
├── tests/  # Test cases
├── pages/ # Page Object Models
├── fixtures/ # Test data or reusable configs
├── playwright.config.ts # Playwright configuration
├── package.json # Project metadata and scripts
└── README.md # Documentation

🧪 Running Tests
Run all tests:
npx playwright test
Run a specific test file:
npx playwright test tests/<file-name>.ts
Run with UI:
npx playwright test --ui

✅ Test Scenarios Covered
- User can add items to cart
- User can update quantities
- User can remove items from cart
- User can place an order
- user can perform extra actions apart from usual addto cart flows.

📊 Playwright Report
To view the latest HTML test report:
npx playwright show-report

🤝 Contributing
Contributions are welcome!
Please fork the repo, create a branch, make your changes, and open a pull request. Make sure your code is well-tested and documented.

📄 License
This project is licensed under the MIT License.
