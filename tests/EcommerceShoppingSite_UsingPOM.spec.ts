//npx playwright test AcademyTest_LoginPOJ.spec.js --config playwright.config1.js to run with specific configuration
//npx playwright test AcademyTest_LoginPOJ.spec.js --config playwright.config1.js browser=chrome to run with specific browser configuration

import { test, expect, Page, Locator } from "@playwright/test";
import { customtest } from '../utils_typescript/testbase';
import { POManager } from '../PageObjects_typescript/POManager';
//convert JSON to string and then convert to Javascript object
const testData = JSON.parse(JSON.stringify(require("../utils/AcademyTest_LoginTestData.json")));

//run below test for multiple test data coming from JSON file in utils
for (const data of testData) {
   test(`@web browser playwright test ${data.productName}`, async ({ page }) => {
      const poManager = new POManager(page);
      const products = await page.locator(".card-body");

      const loginPage = poManager.getLoginPage();
      await loginPage.gotoLoginPage();
      await loginPage.validLogin(data.username, data.password);

      const dashboardPage = poManager.getdashboardPage();
      await dashboardPage.searchProductAddtoCart(data.productName);
      await dashboardPage.navigatetoCart();

      const cartPage = poManager.getCartPage();
      await cartPage.verifyProductinCartPresent(data.productName);
      await cartPage.navigatetoCheckout();

      const checkoutPage = poManager.getCheckoutPage();
      await checkoutPage.fillCheckoutPageandSubmitOrder("ind", "India", "08", data.username);
      const orderId:any = await checkoutPage.getOrderIdDetails();
      console.log(orderId);
      await checkoutPage.NavigatetoOrders();

      const ordersPage = poManager.getOrdersPage();
      const orderPageOrderId = await ordersPage.verifyOrderdetailsinOrderPage(orderId);
      console.log(orderPageOrderId);
      await expect(orderId.includes(orderPageOrderId)).toBeTruthy();

   });
}
//run below test for custom fixture coming from testbase file in utils
customtest("browser playwright test", async ({ page, testDataforOrder }) => {
   const poManager = new POManager(page);
   const products = await page.locator(".card-body");

   const loginPage = poManager.getLoginPage();
   await loginPage.gotoLoginPage();
   await loginPage.validLogin(testDataforOrder.username, testDataforOrder.password);

   const dashboardPage = poManager.getdashboardPage();
   await dashboardPage.searchProductAddtoCart(testDataforOrder.productName);
   await dashboardPage.navigatetoCart();

   const cartPage = poManager.getCartPage();
   await cartPage.verifyProductinCartPresent(testDataforOrder.productName);
   await cartPage.navigatetoCheckout();

   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.fillCheckoutPageandSubmitOrder("ind", "India", "08", testDataforOrder.username);
   const orderId:any = await checkoutPage.getOrderIdDetails();
   console.log(orderId);
   await checkoutPage.NavigatetoOrders();

   const ordersPage = poManager.getOrdersPage();
   const orderPageOrderId = await ordersPage.verifyOrderdetailsinOrderPage(orderId);
   console.log(orderPageOrderId);
   await expect(orderId.includes(orderPageOrderId)).toBeTruthy();

});