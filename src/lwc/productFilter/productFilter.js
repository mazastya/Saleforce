import {LightningElement, track, wire} from 'lwc';
import getProducts from '@salesforce/apex/GetProductController.getProducts';

const FAMILY_OPTIONS = [
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Computers', value: 'Computers' },
    { label: 'Phones', value: 'Phones' },
];

const TYPE_OPTIONS = [
    { label: 'Android', value: 'Android' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Components', value: 'Components' },
    { label: 'Desktop computer', value: 'Desktop computer' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'MacBook', value: 'MacBook' },
];

export default class ProductFilter extends LightningElement {
    @track familyValue = '';
    @track typeValue = '';
    @track products = [];

    @wire(getProducts, { family: '$familyValue', type: '$typeValue' })
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleFamilyChange(event) {
        this.familyValue = event.detail.value;
    }

    handleTypeChange(event) {
        this.typeValue = event.detail.value;
    }

    get familyOptions() {
        return FAMILY_OPTIONS;
    }

    get typeOptions() {
        return TYPE_OPTIONS;
    }
}
