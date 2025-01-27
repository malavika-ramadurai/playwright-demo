import {test,expect} from "@playwright/test";
import {checkoutBtn, confirmedOrder, priceOfOrderedItems} from "../page_objects/ConfirmationPage";
import basePage from "./basePage";
import {itemsToAdd} from "../config";

export class confirmOrder extends basePage{
    constructor(page) {
        super(page)
        this.page=page
    }

    async verifyAddedItems(itemsToAdd){
        const itemsOrdered = await super.waitAndGetAllText(confirmedOrder)
       const itemsOrderedAsExpected= await super.verifyTwoArrayLists(itemsOrdered.sort(),itemsToAdd.sort())
       await expect(itemsOrderedAsExpected).toBe(true,`items Ordered does not match ${itemsOrdered}`)

    }

    async removeCheapestItem(){
        await this.page.pause()

        let itemsOrdered = await super.waitAndGetAllText(priceOfOrderedItems)
        // itemsOrdered = parseFloat(itemsOrdered.map(item => item.replace('$', '')));
        // let cheapestItem= Math.min(...itemsOrdered);
        const listNumb = itemsOrdered.map((elements)=>{
            const value= elements.replace("$","")
            return  parseFloat(value,2)

        })
        let cheapestItem=Math.min(...listNumb)
        cheapestItem = itemsOrdered.indexOf(cheapestItem)
        await this.page.locator(".cart_item .cart_item_label").nth(cheapestItem).locator("text = Remove").click();
        // listNumb.sort((a, b) => b - a);
        // listNumb.shift()
        // global.totalAmount = listNumb.map(Number).reduce((acc, curr) => acc + curr, 0);
        const calculateTotalAmount = (numbers) =>
            numbers.map(Number).reduce((sum, number) => sum + number, 0);

        const removeLowestValue = (numbers) =>
            numbers.sort((a, b) => a - b).shift();

        removeLowestValue(listNumb);

        global.totalAmount = calculateTotalAmount(listNumb);


    }

    async verifyFinallist(){

       const finalList = await this.page.locator(confirmedOrder).count()

        await expect(finalList).toBe(itemsToAdd.length -1)
    }

    async checkoutOrder(){
        await super.waitAndClick(checkoutBtn)
    }

}