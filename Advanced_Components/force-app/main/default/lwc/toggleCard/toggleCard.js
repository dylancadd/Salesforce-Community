import { LightningElement, wire, track } from 'lwc';
import getContactListCulvers from '@salesforce/apex/ContactController.getContactListCulvers';

export default class ToggleCard extends LightningElement {
    @track showCard = false;
    contacts;
    error;

    @wire(getContactListCulvers)
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    handleView() {
        console.log('click')
        if(this.showCard) {
            this.showCard = false;
            console.log('false')
        } else {
            this.showCard = true;
            console.log('true')
        }
    }
}