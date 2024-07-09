import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class InventoryPage {

    readonly productFilter: Locator;
    readonly itemPrices: Locator;
    readonly shoppingCartButton: Locator;
    readonly shoppingCartBadge: Locator;
    readonly addToCartButtons: { [key: string]: Locator };



    constructor(page: Page) {
        this.productFilter = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
        this.addToCartButtons = {
            'sauce-labs-onesie': page.locator('[data-test="add-to-cart-sauce-labs-onesie"]'),
            'sauce-labs-bike-light': page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        };


    }

    public async filterProducts(filter: productFilterOptions) {
        await this.productFilter.waitFor({ state: 'visible' });
        await this.productFilter.selectOption({ label: filter });
    }

    public async getItemPrices(): Promise<number[]> {
        const pricesText = await this.itemPrices.allTextContents();
        const prices = pricesText.map(price => parseFloat(price.replace('$', '')));
        return prices;
    }

    public async addItemToCart(item: string) {
        await this.addToCartButtons[item].click();
    }

    public async getShoppingCartCount(): Promise<number> {
        const cartCountText = await this.shoppingCartBadge.textContent();
        const cartCount = cartCountText ? parseInt(cartCountText, 10) : 0;
        return cartCount;
    }
    
}    



export enum productFilterOptions {
    NAME_A_TO_Z = 'Name (A to Z)',
    NAME_Z_TO_A = 'Name (Z to A)',
    PRICE_LOW_TO_HIGH = 'Price (low to high)',
    PRICE_HIGH_TO_LOW = 'Price (high to low)'
}