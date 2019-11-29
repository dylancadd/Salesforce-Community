import { LightningElement, wire, track } from 'lwc';

// Import methods from apex classes
import getContactList from '@salesforce/apex/ContactController.getContactList';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';

// Imports necessary methods to update and refresh the datatable
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Imports the corresponding fields to get updated
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ID_FIELD from '@salesforce/schema/Contact.Id';

// Assign the outline of the datatable
const cols = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true }
];

// Create variable for delay time
const DELAY = 300;

export default class DataTable extends LightningElement {
    @track error;

    // Code for the combobox
    @track items = [];
    @track value = '';
    @track chosenValue = '';
    @track searchKey = '';

    @wire(findAccounts)
    wiredFindAccounts({ error, data }) {
        if (data) {
            // Creates array with elements which has been retrieved from the controller
            // and assigns the value and name
            for(let i=0; i<data.length; i++)  {
                this.items = [...this.items ,{value: data[i].Name , label: data[i].Name} ];                                   
            }                
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    // Returns the options for the combobox
    get roleOptions() {
        return this.items;
    }

    // Selects the current value of the selected combobox option
    get selectedValue(){
        return this.chosenValue;
    }

    // All code underneath this line is for grabbing the contacts
    // associated to the combobox option

    @track columns = cols;
    @track draftValues = [];

    // Passes a variable to the getContactList apex method with a value of searchKey
    @wire(getContactList, {accountName: '$searchKey'})
    contact;

    // Everytime the combobox option changes, assigns the searchKey to the
    // corresponding value
    searchContact(event){
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.chosenValue = searchKey;

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY);
    }


    // Everytime the save button has been clicked due to editing a record,
    // update and refresh the datable
    handleSave(event) {

        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;
        fields[ACCOUNT_FIELD.fieldApiName] = event.detail.draftValues[0].Account;
        fields[PHONE_FIELD.fieldApiName] = event.detail.draftValues[0].Phone;
        fields[EMAIL_FIELD.fieldApiName] = event.detail.draftValues[0].Email;
        
        const recordInput = {fields};

        // Updates the record with the correct values
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            // Clear all draft values
            this.draftValues = [];

            // Display fresh data in the datatable
            return refreshApex(this.contact);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}