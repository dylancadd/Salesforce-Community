import { LightningElement, track } from 'lwc';
import getContactListCulversForDelete from '@salesforce/apex/ContactController.getContactListCulversForDelete';
import deleteCulverContact from '@salesforce/apex/ContactController.deleteCulverContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteCulverContact extends LightningElement {
    @track contacts;

    handleClick(event) {

        deleteCulverContact({searchKey: event.target.value}).then(result => {
            this.callApexClass();
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.contacts = null;
        });

        const eventT = new ShowToastEvent({
            title: 'Successful!',
            message: 'Successfully Deleted Contact',
            variant: 'success'
        });
        this.dispatchEvent(eventT);
    }
 
    // call apex method on button click 
    connectedCallback() {
        this.callApexClass();
    }

    callApexClass() {

        getContactListCulversForDelete({}).then(result => {
            // set @track contacts variable with return contact list from server  
            this.contacts = result;
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.contacts = null;
        });
    }
}