import { LightningElement, api } from 'lwc';

export default class SsnChild extends LightningElement {
    @api contact;

    handleClick(event) {

        console.log('click')
        console.log(this.template.querySelector('[data-mask="' + event.target.value + '"]'));

        var node = this.template.querySelector('[data-mask="' + event.target.contact.value + '"]');

        // console.log(this.template.querySelector('[data-mask="' + event.target.contact.value + '"]'));

        if(node.classList.contains("masked")) {
            node.classList.remove('masked');
        } else {
            node.classList.add('masked');
        }

    }
}