/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class HideShow extends LightningElement {
    @track button = 'Show';  
  
    handleClick(event) {  
        const label = event.target.label;

        const input = this.template.querySelector("lightning-input")
  
        if ( label === 'Show' ) {  
            this.button = 'Hide';
            input.type = 'text';

        } else if ( label === 'Hide' ) {  
            this.button = 'Show';  
            input.type = 'password' 
        }  

    } 

        
    

}