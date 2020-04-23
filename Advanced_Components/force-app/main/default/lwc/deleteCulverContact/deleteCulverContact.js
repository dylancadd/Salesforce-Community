import { LightningElement, track } from 'lwc';
import getContactListCulvers from '@salesforce/apex/ContactController.getContactListCulvers';
import deleteCulverContact from '@salesforce/apex/ContactController.deleteCulverContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class DeleteCulverContact extends LightningElement {
    @track contacts;
    sVal = '';

    message(event) {

        deleteCulverContact({
            searchKey: event.target.value
        })
        .then(result => {
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

        const eventT = new ShowToastEvent({
            title: 'Successful!',
            message: 'Successfully Deleted Contact Associated With: ' + event.target.value,
            variant: 'success'
        });
        this.dispatchEvent(eventT);
    }
 
    // update sVal var when input field value change
    updateSeachKey(event) {
        this.sVal = event.target.value;
    }
 
    // call apex method on button click 
    connectedCallback() {
        // if search input value is not blank then call apex method, else display error msg 
        getContactListCulvers({
                
            })
            .then(result => {
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