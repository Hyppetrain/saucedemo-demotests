import { setWorldConstructor, Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

class CustomWorld {
    browser!: Browser;
    page!: Page;

    async init() {
        this.browser = await chromium.launch({ headless: true });
        this.page = await this.browser.newPage();
    }

    async close() {
        await this.page.close();
        await this.browser.close();
    }
}

const contextOptions = {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
};

setWorldConstructor(CustomWorld);



Before(async function () {
    await this.init();
});

AfterStep(async function () {
    await this.page.waitForTimeout(500); //timeout for debugging
});

After(async function () {
    await this.close();
});
