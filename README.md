This demo project contains to sets of tests, one using plain Playwright + TS, the second one using BDD testing structure using Cucumber (gherkin) scenarios.
I included those to showcase the potential advantage of writing tests in a "human" form.

Tests can be ran locally, or you can look at the results from an automated deploy in this repo.

Plain Playwright tests include a report page, Cucumber tests do not (however their run results are still displayed in the Actions tab under (Run Cucumber tests))


# Install Playwright browsers + dependencies
npx playwright install

# Run all tests once
npm run test:all

# Run plain Playwright tests
npm run test:e2e

# Run .feature cucumber tests
npm run test:gherkin


# Configure Headless modes for Cucumber tests in \steps\world.ts
# Configure Headless modes for plain Playwright tests in \playwright.config.ts

# Output – a HTML report is generated in playwright-report.
# When using CI pipeline, the Report for Playwright tests is found in Actions Tab under "Upload Playwright report"
