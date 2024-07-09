
import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class CheckoutPage {
    readonly checkoutButton: Locator;
    readonly customerFirstName: Locator;
    readonly customerLastName: Locator;
    readonly customerPostalCode: Locator;
    readonly submitCustomerInformationButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.customerFirstName = page.locator('[data-test="firstName"]');
        this.customerLastName = page.locator('[data-test="lastName"]')
        this.customerPostalCode = page.locator('[data-test="postalCode"]')
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.submitCustomerInformationButton = page.getByRole('button', { name: 'Continue' });
    }

    public async enterCustomerInformation(firstName: string, lastName: string, postalCode: string) {
        await this.customerFirstName.fill(firstName);
        await this.customerLastName.fill(lastName);
        await this.customerPostalCode.fill(postalCode);
        await this.submitCustomerInformationButton.click();
        await expect(this.submitCustomerInformationButton.page()).toHaveURL(/checkout-step-two/);
    }
}