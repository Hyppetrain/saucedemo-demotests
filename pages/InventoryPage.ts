import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly headerTitle: Locator;
    readonly productList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerTitle = page.locator('.title');
        this.productList = page.locator('.inventory_item');
    }
}
