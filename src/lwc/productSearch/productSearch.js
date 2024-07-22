import {LightningElement, track} from 'lwc';
import searchProducts from '@salesforce/apex/ProductSearchController.searchProducts';

export default class ProductSearch extends LightningElement {
    @track name = '';
    @track description = '';
    @track products = [];

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleSearch() {
        searchProducts({ name: this.name, description: this.description })
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                console.error('Error searching products: ', error);
            });
    }

}
