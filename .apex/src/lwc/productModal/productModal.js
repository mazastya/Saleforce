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
    @api isModalOpen = false;

    @track productName = '';
    @track productDescription = '';
    @track productPrice = 0;
    @track selectedFamily;
    @track selectedType;
    @track productImageUrl = '';

    @track familyOptions = [];
    @track typeOptions = [];

    connectedCallback() {
        this.initializePicklistOptions();
    }

    initializePicklistOptions() {
        this.familyOptions = [
            { label: 'Accessories', value: 'Accessories' },
            { label: 'Computers', value: 'Computers' },
            { label: 'Phones', value: 'Phones' },
        ];

        this.typeOptions = [
            { label: 'Android', value: 'Android' },
            { label: 'Apple', value: 'Apple' },
            { label: 'Components', value: 'Components' },
            { label: 'Desktop computer', value: 'Desktop computer' },
            { label: 'Laptop', value: 'Laptop' },
            { label: 'MacBook', value: 'MacBook' },
        ];
    }

    handleShowModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleProductNameChange(event) {
        this.productName = event.target.value;
    }

    handleProductDescriptionChange(event) {
        this.productDescription = event.target.value;
    }

    handleProductPriceChange(event) {
        this.productPrice = event.target.value;
    }

    handleFamilyChange(event) {
        this.selectedFamily = event.detail.value;
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }

    handleProductImageUrlChange(event) {
        this.productImageUrl = event.target.value;
    }

    handleCreateClick() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.productName;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.productDescription;
        fields[PRICE_FIELD.fieldApiName] = this.productPrice;
        fields[FAMILY_FIELD.fieldApiName] = this.selectedFamily;
        fields[TYPE_FIELD.fieldApiName] = this.selectedType;

        const recordInput = { apiName: PRODUCT_OBJECT.objectApiName, fields };

        
        fetch(`http://www.glyffix.com/api/Image?word=${this.productName}`)
            .then(response => response.json())
            .then(data => {
                fields[IMAGE_FIELD.fieldApiName] = data.image;
                createRecord(recordInput)
                    .then(product => {
                        this.dispatchEvent(new CustomEvent('product-create', { detail: product.id }));
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
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

}
