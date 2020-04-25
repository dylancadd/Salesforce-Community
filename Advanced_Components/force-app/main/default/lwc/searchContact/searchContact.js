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
 
    // call apex method on button click 
    handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if (this.sVal !== '') {
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
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}