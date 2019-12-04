import { LightningElement, track } from 'lwc';

export default class PhoneNumber2 extends LightningElement {
    @track areaCode = 608;
    @track first = 921;
    @track last = 3103;
    @track phoneNumberFinal;

    handleYes() {
        this.phoneNumberFinal = "(" + this.areaCode + ") " + this.first + "-" + this.last;
    }

    handleNo() {
        this.areaCode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        this.first = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        this.last = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    }
}