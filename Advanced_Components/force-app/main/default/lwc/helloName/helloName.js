import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';
import FIRSTNAME_FIELD from '@salesforce/schema/User.FirstName';


export default class HelloName extends LightningElement {
    @api startingText;
    @api endingText;

    @track error;
    @track firstName;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [FIRSTNAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.firstName = data.fields.FirstName.value;
        }
    }

    
}