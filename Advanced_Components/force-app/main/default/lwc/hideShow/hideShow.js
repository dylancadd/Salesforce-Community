/* eslint-disable no-console */
import { LightningElement } from 'lwc';

export default class HideShow extends LightningElement {

    handleClick(event) {  

        const input = this.template.querySelector("input")

        if (input.type === 'password') {
            input.type = 'text'
        } else if (input.type === 'text') {
            input.type = 'password'
        }
    }
}