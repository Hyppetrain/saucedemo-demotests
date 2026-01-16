// tests/saucedemo.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testUser, getProductName } from '../utils/fixtures';

test.describe('SauceDemo Basic E2E flow', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    // Runs before each test in this block
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(testUser.username, testUser.password);
    });

    test('should load the inventory page after successful login', async () => {
        // After login redirect to /inventory.html
        await expect(loginPage.page).toHaveURL(/\/inventory\.html$/);

        await expect(inventoryPage.headerTitle).toBeVisible();
        await expect(inventoryPage.headerTitle).toHaveText('Products');
        await expect(inventoryPage.productList.first()).toBeVisible();


        // check that at least one product is loaded and displayed
        const inv = new InventoryPage(loginPage.page);
        await expect(inv.productList.first()).toBeVisible();
    });

    test('should add an item to the cart and see the counter update', async () => {
        await expect(inventoryPage.headerTitle).toBeVisible();

        // Add the first product to the cart
        const firstAddButton = inventoryPage.page.locator('.inventory_item').first().locator('button');
        await firstAddButton.click();

        // Cart badge should show "1""
        const cartBadge = loginPage.page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        // Click cart icon to navigate to cart
        await loginPage.page.locator('.shopping_cart_link').click();

        // Verify we are on /cart.html
        await expect(loginPage.page).toHaveURL(/\/cart\.html$/);

        // Cart should contain product
        const firstProduct = getProductName(0);
        const cartItem = loginPage.page.locator('.cart_item');
        await expect(cartItem).toContainText(firstProduct);
    });
});
