import basePage from "./basePage";
import {finishPurchaseBtn, subtotal, taxAmount} from "../page_objects/checkoutOverview";
import {expect} from "@playwright/test";


export class checkoutOverviewPage extends basePage {
    constructor(page) {
        super(page)
        this.page =page
    }

    async verifyPaymentInformation()
    {
        const totalPurchaseAmount = global.totalAmount;
        console.log(totalPurchaseAmount)
        let purchaseAmount = await super.waitAndGetAllText(subtotal)
        purchaseAmount =await super.getNumberPart(purchaseAmount)
        let tax = await super.waitAndGetAllText(taxAmount)
        tax = await super.getNumberPart(tax)
        const orderTax = ((totalPurchaseAmount * 0.08).toFixed(2));
        expect (parseFloat(purchaseAmount)).toBeCloseTo(parseFloat(purchaseAmount),0.01)
        expect(parseFloat(orderTax)).toBeCloseTo(parseFloat(tax), 0.01);
    }
    async finishPurchase()
    {
        await super.waitAndClick(finishPurchaseBtn)
    }
}