import { Page } from '@playwright/test';


export interface User {
    username: string;
    password: string;
}

export const testUser: User = {
    username: process.env.SAUCEDEMO_USER ?? 'standard_user',
    password: process.env.SAUCEDEMO_PASS ?? 'secret_sauce',
};

// Returns a product name by index from the page
export const getProductName = async (page: Page, index: number): Promise<string> => {
    const productElements = page.locator('.inventory_item_name');
    const count = await productElements.count();

    if (count === 0) throw new Error('No products found on the page');

    // Wrap around if index is bigger than number of products
    const safeIndex = index % count;

    const text = await productElements.nth(safeIndex).textContent();
    if (!text) throw new Error(`Product at index ${safeIndex} has no text`);
    return text;
};

