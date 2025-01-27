import {baseUrl} from "../config";
import basePage from "./basePage";
import {username,password,loginButton} from "../page_objects/loginPage";
import testData from "../data/users.json";
import {expect} from "@playwright/test";

 export class loginPage extends basePage {
    constructor(page) {
        super(page); // Ensure the parent constructor is called
        this.page = page;
    }

    async openApp() {
        await super.open(baseUrl);
        await this.assertUrl()
    }
    async assertUrl() {
        const currentUrl = this.page.url();
        if (currentUrl !== baseUrl) {
            throw new Error(`URL mismatch! Expected: ${baseUrl}, but got: ${currentUrl}`);
        }
    }

    async loginAsStdUser() {
        //await super.waitForPageLoad()
        await super.waitAndFill(username,testData.standard_user)
        await super.waitAndFill(password,testData.password)
        await super.waitAndClick(loginButton)
    }
}

