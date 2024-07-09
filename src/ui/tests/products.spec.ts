import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-object-models/login-page';
import { InventoryPage, productFilterOptions} from '../page-object-models/inventory-page';
import { CheckoutPage } from '../page-object-models/checkout-page';


test.describe('Products functionality', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login(page, 'standard_user', 'secret_sauce');
    });

    test('E2E : Purchase flow', async ({ page }) => {
        
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.filterProducts(productFilterOptions.PRICE_LOW_TO_HIGH)
        
        const prices = await inventoryPage.getItemPrices();

        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);

        const checkoutPage = new CheckoutPage(page);
        
        await inventoryPage.addItemToCart('sauce-labs-onesie');
        let cartCount = await inventoryPage.getShoppingCartCount();

        expect(cartCount).toEqual(1);

        await inventoryPage.addItemToCart('sauce-labs-bike-light');
        cartCount = await inventoryPage.getShoppingCartCount();

        expect(cartCount).toEqual(2);

        await inventoryPage.shoppingCartButton.click();
        page.waitForURL('**/cart.html');

        expect(page.url()).toContain('/cart.html');
        await expect(page.getByText('Your Cart')).toBeVisible();
        await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

        await checkoutPage.checkoutButton.click();

        expect(page.url()).toContain('/checkout-step-one.html');

        await checkoutPage.enterCustomerInformation('John', 'Doe', '1234');

        await expect(page.getByText('Checkout: Overview')).toBeVisible();
        await expect(page.getByText('Sauce Labs Onesie')).toBeVisible();
        await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();

        await checkoutPage.finishButton.click();

        expect(page.url()).toContain('/checkout-complete.html');
        await expect(page.getByText('Checkout: Complete!')).toBeVisible();
        await expect(page.getByText('Thank you for your order!')).toBeVisible();

    });



});