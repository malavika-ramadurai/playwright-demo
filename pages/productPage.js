import basePage from "./basePage";
import {inventoryItems, cartBadge} from "../page_objects/productPage";
const { test, expect } = require('@playwright/test');

export class productPage extends basePage{
    constructor(page) {
        super(page); // Ensure the parent constructor is called
        this.page = page;
        this.totalItems=page.locator(inventoryItems)
    }
   async addItemsToCart(itemsToAdd){
       // addItemsToCart =async(items)=>{
        await super.waitForPageLoad()

       // await this.page.locator(".inventory_container").waitFor();
        const itemCount = await this.totalItems.count();

        for(let i=0; i<itemCount;i++)
        {
            if(itemsToAdd.includes(await this.page.locator(".inventory_list .inventory_item").nth(i).locator(".inventory_item_name").textContent()))
            {
                await this.page.locator(".inventory_list .inventory_item").nth(i).locator("text=  Add To cart").click();
                // break;

            }
        }

    }
    async checkCartAndConfirm(itemsToAdd){

        const cartItemCount = parseInt(await super.waitAndGetAllText(cartBadge));
        expect(cartItemCount).toBe(itemsToAdd, `The cart item count ${cartItemCount} does not match the number of items added ${itemsToAdd}`);
        await super.waitAndClick(cartBadge)
    }

}