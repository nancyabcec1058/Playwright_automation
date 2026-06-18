import { test as basetest } from '@playwright/test';

interface TestDataforOrder {
    username: string;
    password: string;
    productName: string;
};
export const customtest = basetest.extend<{ testDataforOrder: TestDataforOrder}>(
    {
        testDataforOrder: {
            username: "radha21@mymail.com",
            password: "Abc&xyz123",
            productName: "ZARA COAT 3"
        }
    })