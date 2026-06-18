import { Page, Locator } from "@playwright/test";
export class DashboardPage {
    page: Page;
    products: Locator;
    productTitles: Locator;
    cart: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productTitles = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }
    async searchProductAddtoCart(productName: string) {
        await this.products.first().waitFor();
        const titles = await this.productTitles.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                //text based locator
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigatetoCart() {
        await this.cart.click();
    }
}
