import { LightningElement, track } from 'lwc';

export default class PhoneNumber1 extends LightningElement {
    @track val = 0;
    changeHandler(event) {
        this.val = event.target.value;
    }
}