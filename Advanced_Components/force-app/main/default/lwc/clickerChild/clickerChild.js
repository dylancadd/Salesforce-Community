import { LightningElement, api } from 'lwc';

export default class ClickerChild extends LightningElement {
    @api value;

    get valueString() {
      return this.value.toString();
    }
  
    handleDecrementClick() {
      this.dispatchEvent(new CustomEvent('decrement'));
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