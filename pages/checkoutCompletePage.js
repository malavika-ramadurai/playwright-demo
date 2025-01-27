import {expect} from "@playwright/test";
import basePage from "./basePage";
import {thankYouText} from "../page_objects/checkoutComplete";
const EXPECTED_THANK_YOU_TEXT = "Thank you for your order!";
export class checkoutCompletePage extends basePage{
    constructor(page) {
        super(page);
        this.page =page;
    }

    async verifyThankYouScreen() {
        const text = await super.waitAndGetAllText(thankYouText);
        console.log(text);
        await expect(text[0]).toBe(EXPECTED_THANK_YOU_TEXT);
    }



}