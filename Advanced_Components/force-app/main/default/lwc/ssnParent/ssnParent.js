import { LightningElement, track, wire } from 'lwc';
import getContactListCulvers from '@salesforce/apex/ContactController.getContactListCulvers';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SsnParent extends LightningElement {
    @track contacts;

    @wire(getContactListCulvers) contacts;

    // call apex method on button click 
    // connectedCallback() {
    //     this.callApexClass()
        
    // }

    callApexClass() {

        

        // getContactListCulversForDelete({}).then(result => {
        //     // set @track contacts variable with return contact list from server  
        //     this.contacts = result;
        // })
        // .catch(error => {
        //     // display server exception in toast msg 
        //     const event = new ShowToastEvent({
        //         title: 'Error',
        //         variant: 'error',
        //         message: error.body.message,
        //     });
        //     this.dispatchEvent(event);
        //     // reset contacts var with null   
        //     this.contacts = null;
        // });
    }
}