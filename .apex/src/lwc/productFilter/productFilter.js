import {LightningElement, track, wire} from 'lwc';
import getProducts from '@salesforce/apex/GetProductController.getProducts';

const FAMILY_OPTIONS = [
    { label: 'Family 1', value: 'Family_1' },
    { label: 'Family 2', value: 'Family_2' },
    { label: 'Family 3', value: 'Family_3' },
];

const TYPE_OPTIONS = [
    { label: 'Type 1', value: 'Type_1' },
    { label: 'Type 2', value: 'Type_2' },
    { label: 'Type 3', value: 'Type_3' },
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
