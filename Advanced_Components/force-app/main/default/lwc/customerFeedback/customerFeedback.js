import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomerFeedback extends NavigationMixin(LightningElement) {

    @track transactionNumber = "";
    @track name = "";
    @track email = "";
    @track date = "";
    @track description = "";

    url;

    connectedCallback() {
        this.accountHomePageRef = {
            type: 'comm__namedPage',
            attributes: {
                name: 'Customer_Feedback_Success__c'
            },
            state: {
                c__transactionNumber: this.transactionNumber,
                c__name: this.name,
                c__email: this.email,
                c__date: this.date,
                c__description: this.description
            }
        };
        this[NavigationMixin.GenerateUrl](this.accountHomePageRef)
            .then(url => this.url = url);
    }

    handleClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this[NavigationMixin.Navigate](this.accountHomePageRef);
    }

}