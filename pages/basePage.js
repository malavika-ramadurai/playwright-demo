import { expect } from '@playwright/test'
class BasePage{
    constructor(page)
    {
        this.page =page
    }
    async open(url){
        return await this.page.goto(url)
    }
    async waitForPageLoad()
    {
        await this.page.waitForLoadState('load'); // Wait for the "load" state
        await this.page.waitForLoadState('networkidle'); // Ensure network activity is idle
        await this.page.waitForSelector('body'); // Wait for the body element to be available
    }
    async waitAndFill(selector, text) {
        return await this.page.fill(selector, text)
    }
    async waitAndClick(selector) {
        return await this.page.click(selector)
    }
    // async getTitle() {
    //     return await this.page.title()
    // }
    // async getUrl(){
    //     return await this.page.url()
    // }
    async verifyTwoArrayLists(array1,array2){
        const arraysMatch =
            array1.length === array2.length &&
            array1.every((item, index) => item === array2[index]);

        console.log(`Items match: ${arraysMatch}`); // Log result
        return arraysMatch;
    }
    async waitAndGetAllText(selector)
    {
        const locatorText = await this.page.locator(selector)
        return await locatorText.allInnerTexts()
    }
 async getNumberPart(value){
     const floatValue =parseFloat(String(value).match(/[\d.]+/)[0]).toFixed(2);
    return floatValue;
 }
    }
export default BasePage