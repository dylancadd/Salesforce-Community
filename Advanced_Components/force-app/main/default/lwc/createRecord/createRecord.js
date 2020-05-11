import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecord extends LightningElement {

    handleSuccess(event) {
        const firstName = this.template.querySelector(".firstName")
        const lastName = this.template.querySelector(".lastName")
        const title = this.template.querySelector(".title")
        const email = this.template.querySelector(".email")
        const mobilePhone = this.template.querySelector(".mobilePhone")

        firstName.value = "";
        lastName.value = "";
        title.value = "";
        email.value = "";
        mobilePhone.value = "";

        const toast = new ShowToastEvent({
            title: 'Successful!',
            message: 'A new contact has been created.',
            variant: 'success'
        });
        this.dispatchEvent(toast);
    }


    
}