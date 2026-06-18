
import { LoginPage } from "./loginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";
import { Page } from "@playwright/test";
export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    ordersPage: OrdersPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersPage = new OrdersPage(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getdashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }
}
