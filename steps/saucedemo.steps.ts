import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testUser } from '../utils/fixtures';

let login: LoginPage;
let inventory: InventoryPage;


// Helpers –------------------------------------------------------------------
const addFirstProduct = async () => {
    const firstAddBtn = inventory.page.locator('.inventory_item').first().locator('button');
    await firstAddBtn.click();
};

export const removeFirstProduct = async () => {
    const firstRemoveBtn = inventory.page
        .locator('.inventory_item')
        .first()
        .locator('button', { hasText: 'Remove' }); // ensures we click the actual "Remove" button
    await firstRemoveBtn.click();
};

// Gherkin steps -----------------------------------------------------------
Given('I open the saucedemo homepage', async function () {
    login = new LoginPage(this.page);
    await login.goto();
});

When('I login with valid credentials', async function () {
    await login.login(testUser.username, testUser.password);
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
    await login.login(username, password);
});

Then('I should see the inventory page', async function () {
    const inv = new InventoryPage(this.page);
    await expect(inv.headerTitle).toBeVisible();
    await expect(inv.headerTitle).toHaveText('Products');
});

Then('I should see at least one product listed', async function () {
    await expect(this.page).toHaveURL(/inventory\.html/);
    const inv = new InventoryPage(this.page);
    await expect(inv.productList.first()).toBeVisible();
});

When('I add the first product to the cart', async function () {
    inventory = new InventoryPage(this.page);
    await addFirstProduct();
});

Then('the cart badge should show {string}', async function (count: string) {
    const badge = this.page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText(count);
});

When('I remove the same product from the cart', async function () {
    inventory = new InventoryPage(this.page);
    await removeFirstProduct();
});

Then('the cart badge should be hidden', async function () {
    const badge = this.page.locator('.shopping_cart_badge');
    await expect(badge).toHaveCount(0);
});

When('I have added a product to the cart', async function () {
    inventory = new InventoryPage(this.page);
    await addFirstProduct();
});

Then('I should see an error message {string}', async function (expected) {
    const err = this.page.locator('[data-test="error"]');
    await expect(err).toContainText(expected);
});

