import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';
import FIRSTNAME_FIELD from '@salesforce/schema/User.FirstName';
import NAME_FIELD from '@salesforce/schema/User.LastName';

import userGrab from '@salesforce/apex/ContactController.userGrab';


export default class HelloName extends LightningElement {
    @api startingText;
    @api endingText;
    @track fullName;

    @track error;
    @track firstName;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [FIRSTNAME_FIELD]
    }) wireuser({
        error,
        data
    }) {``
        if (error) {
            this.error = error;
        } else if (data) {
            this.firstName = data.fields.FirstName.value;
        }
    }

    // Testing
    @wire(userGrab, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {``
        if (error) {
            this.error = error;
        } else if (data) {
            this.fullName = data.fields.Contact.LastName.value;
        }
    }

    
}