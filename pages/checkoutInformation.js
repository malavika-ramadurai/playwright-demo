import basePage from "./basePage";
import testData from "../data/users.json";
import {firstName, lastName, pincode,continueBtn} from "../page_objects/checkoutInfo";

export class checkoutInformation extends basePage{
    constructor(page) {
        super(page)
        this.page=page
    }
        async enterCustomerDetailsAndContinue(){
            await super.waitAndFill(firstName,testData.firstName)
            await super.waitAndFill(lastName,testData.lastName)
            await super.waitAndFill(pincode,testData.pinCode)
            await super.waitAndClick(continueBtn)
}
}