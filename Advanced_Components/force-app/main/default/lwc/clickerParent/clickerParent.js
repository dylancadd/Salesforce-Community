import { LightningElement, track } from 'lwc';

export default class ClickerParent extends LightningElement {
    @track value = 0;
    @track plural = "s";
  
    handleDecrement() {
      this.value -= 1;
      this.handlePlural();
    }
  
    handleIncrement() {
      this.value += 1;
      this.handlePlural();
    }
  
    handleReset() {
      this.value = 0;
      this.handlePlural();
    }
  
    handlePlural() {
      if (this.value === 1 || this.value === -1) {
          this.plural = "";
      } else {
          this.plural = "s";
      }
    }
}