
const { expect } = require('@playwright/test');
import {itemsToAdd} from "../config";
import test from '../testFixtures/fixture'


test.describe('Login as a standard user to complete the checkout workflow', () => {
    test('Login to App as a standard user', async ({
                                                       loginPage,
                                                       productPage,
                                                       confirmOrder,
                                                       checkoutInfo,
                                                       checkoutOverview,
                                                       checkoutComplete
                                                   }) => {
        await test.step(`Open the APP and check logo`, async () => {
            await loginPage.openApp();

        })

        await test.step(`Login as a Standard user`, async () => {
            await loginPage.loginAsStdUser()
        })

        await test.step(`place Order`, async()=>{
                await productPage.addItemsToCart(itemsToAdd);
                 await productPage.checkCartAndConfirm(itemsToAdd.length)
            })
        await test.step(`confirm order`, async()=>{
            await confirmOrder.verifyAddedItems(itemsToAdd)
            await confirmOrder.removeCheapestItem()
            await confirmOrder.verifyFinallist()
            await confirmOrder.checkoutOrder()
        })
        await test.step(`EnterCheckout information`, async()=>{
            await checkoutInfo.enterCustomerDetailsAndContinue()
            await checkoutOverview.verifyPaymentInformation()
            await checkoutOverview.finishPurchase()

        })
        await test.step(`Checkout complete`, async() =>{
            await checkoutComplete.verifyThankYouScreen()
        })
    });
});
