import { expect, Page, Locator } from "@playwright/test";
export class CartPage {
    page: Page;
    cartProducts: Locator;
    checkout: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("div ul li");
        this.checkout = page.locator("text=Checkout");


    }
    async verifyProductinCartPresent(productName: string) {
        await this.cartProducts.first().waitFor();
        const prodInCart = await this.page.getByText(productName).isVisible();
        expect(prodInCart).toBeTruthy();
    }
    async navigatetoCheckout() {
        await this.checkout.click();
    }
}
