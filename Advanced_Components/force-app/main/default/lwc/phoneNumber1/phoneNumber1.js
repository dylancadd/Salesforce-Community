import { LightningElement, track } from 'lwc';

export default class PhoneNumber1 extends LightningElement {
    @track areaCode = 608;
    @track first = 921;
    @track last = 3103;


    changeAreaCode(event) {
        this.areaCode = event.target.value;
    }
    changeFirst(event) {
        this.first = event.target.value;
    }
    changeLast(event) {
        this.last = event.target.value;
    }

    

}