import { LightningElement, api } from 'lwc';

export default class ClickerChild extends LightningElement {
    @api value;

    get valueString() {
      return this.value.toString();
    }
  
    handleIncrementClick() {
      this.dispatchEvent(new CustomEvent('increment'));
    }
  
    handleResetClick() {
      this.dispatchEvent(new CustomEvent('reset'));
    }
  
    handleValue() {
        return this.value.toString();
    }
}