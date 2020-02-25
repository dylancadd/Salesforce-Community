import { LightningElement } from 'lwc';

export default class ButtonStateful extends LightningElement {

    clickedMe() {
        
        const button = this.template.querySelector("button")

        if (button.className === "slds-button slds-button--neutral slds-not-selected") {
            button.className = "slds-button slds-button--neutral slds-is-selected-clicked"
            console.log("Selected")
        } else {
            button.className = "slds-button slds-button--neutral slds-not-selected"
            console.log("Not selected")
        }

    }
}