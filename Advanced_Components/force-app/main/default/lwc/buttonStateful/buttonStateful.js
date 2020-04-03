import { LightningElement } from 'lwc';

export default class ButtonStateful extends LightningElement {

    clickedMe() {
        
        const button = this.template.querySelector("button")

        if (button.classList.contains('slds-not-selected')) {
            button.classList.remove('slds-not-selected')
            button.classList.add("slds-is-selected-clicked")
        } else {
            button.classList.remove('slds-is-selected-clicked')
            button.classList.add("slds-not-selected")
        }

    }
}