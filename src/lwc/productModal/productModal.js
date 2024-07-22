import {api, LightningElement, track} from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import PRODUCT_OBJECT from '@salesforce/schema/Product__c';
import NAME_FIELD from '@salesforce/schema/Product__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Product__c.Description__c';
import PRICE_FIELD from '@salesforce/schema/Product__c.Price__c';
import FAMILY_FIELD from '@salesforce/schema/Product__c.Family__c';
import TYPE_FIELD from '@salesforce/schema/Product__c.Type__c';
import IMAGE_FIELD from '@salesforce/schema/Product__c.Image__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ProductModal extends LightningElement {
    @track productName = '';
    @track productDescription = '';
    @track productPrice = 0;
    @track productFamily = '';
    @track productType = '';
    @track productImageUrl = '';

    handleProductNameChange(event) {
        this.productName = event.target.value;
    }

    handleProductDescriptionChange(event) {
        this.productDescription = event.target.value;
    }

    handleProductPriceChange(event) {
        this.productPrice = event.target.value;
    }

    handleProductFamilyChange(event) {
        this.productFamily = event.target.value;
    }

    handleProductTypeChange(event) {
        this.productType = event.target.value;
    }

    handleProductImageUrlChange(event) {
        this.productImageUrl = event.target.value;
    }

    @api
    handleCreateClick() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.productName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.productDescription;
        fields[PRICE_FIELD.fieldApiName] = this.productPrice;
        fields[FAMILY_FIELD.fieldApiName] = this.productFamily;
        fields[TYPE_FIELD.fieldApiName] = this.productType;
        fields[IMAGE_FIELD.fieldApiName] = this.productImageUrl;

        const recordInput = {apiName: PRODUCT_OBJECT.objectApiName, fields};
        createRecord(recordInput)
            .then(product => {
                this.dispatchEvent(new CustomEvent('productcreate', {detail: product.id}));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Product created',
                        variant: 'success'
                    })
                );
                this.closeModal();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
