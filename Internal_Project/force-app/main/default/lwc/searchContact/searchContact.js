import { LightningElement, track } from 'lwc';
import searchCulverContact from '@salesforce/apex/ContactController.searchCulverContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class SearchContact extends LightningElement {
    @track contacts;
    sVal = '';
 
    // update sVal var when input field value change
    updateSeachKey(event) {
        this.sVal = event.target.value;
    }

    connectedCallback() {
        this.callApexClass();
    }

    callApexClass() {
        searchCulverContact({searchKey: this.sVal}).then(result => {
            // set @track contacts variable with return contact list from server  
            this.contacts = result;
        }).catch(error => {
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
 
    // call apex method on button click 
    handleSearch() {
        this.callApexClass()
    }
}