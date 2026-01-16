export interface User {
    username: string;
    password: string;
}

export const testUser: User = {
    username: process.env.SAUCEDEMO_USER ?? 'standard_user',
    password: process.env.SAUCEDEMO_PASS ?? 'secret_sauce',
};

/** Returns a product name by index (0‑based) */
export const getProductName = (index: number): string => {
    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
    ];
    return products[index % products.length];
};
