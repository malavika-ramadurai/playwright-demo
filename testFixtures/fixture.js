import { test as fixture } from '@playwright/test'
import {loginPage} from '../pages/loginPage'
import {productPage} from "../pages/productPage";
import {confirmOrder} from "../pages/confirmOrder";
import {checkoutInformation} from "../pages/checkoutInformation";
import {checkoutOverviewPage} from "../pages/checkoutOverviewPage";
import {checkoutCompletePage} from "../pages/checkoutCompletePage";
const test = fixture.extend({
    loginPage: async ({ page }, use) => {
        await use(new loginPage(page))
    },
    productPage: async ({ page }, use) => {
        await use(new productPage(page))
    },
    confirmOrder: async ({ page }, use) => {
        await use(new confirmOrder(page))
    },
    checkoutInfo: async ({ page }, use) => {
        await use(new checkoutInformation(page))
    },
    checkoutOverview :async ({ page }, use) => {
        await use(new checkoutOverviewPage(page))
    },
    checkoutComplete :async ({ page }, use) => {
        await use(new checkoutCompletePage(page))
    }
})
export default test