# Install Playwright browsers + dependencies
npx playwright install

# Run all tests once
npm run test:all

# Plain Playwright tests
npm run test:e2e

# Run .feature cucumber tests
npm run test:gherkin


# Configure Headless modes for Cucumber tests in \steps\world.ts
# Configure Headless modes for plain Playwright tests in \playwright.config.ts

# Output – a HTML report is generated in playwright-report.