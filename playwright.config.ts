// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(); // loads .env

const config: PlaywrightTestConfig = {
    testDir: './tests',
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
    },

    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        //{ name: 'firefox', use: { browserName: 'firefox' } },
        //{ name: 'webkit', use: { browserName: 'webkit' } },
    ],

    reporter: [['html', { open: 'never' }]],
    timeout: 30_000,
};

export default config;
