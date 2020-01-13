import { LightningElement, api, track } from 'lwc';

export default class FileUpload extends LightningElement {

    @api myRecordId;
    @track uploadedFile;

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg'];
    }

    handleUploadFinished(event) {

        const uploadedFiles = event.detail.files;
        this.uploadedFile = uploadedFiles[0].name;
        
    }
}