// import { LightningElement } from 'lwc';
// import ShowAccountUserNameNumber from './showAccountUserNameNumber.js';
// import ProductModal from './productModal.js';
//
// export default class MyComponent extends LightningElement {
//     showModal = false;
//
//     openModal() {
//         this.showModal = true;
//     }
//
//     closeModal() {
//         this.showModal = false;
//     }
//
//     handleProductCreate(event) {
//         const product = event.detail;
//         // do something with the created product
//         this.closeModal();
//     }
//
//     renderedCallback() {
//         const accountUserNameNumber = new ShowAccountUserNameNumber(this.template);
//         this.template.querySelector('div.account-user-info').appendChild(accountUserNameNumber.target);
//
//         const productModal = new ProductModal(this.template);
//         this.template.querySelector('div.modal-container').appendChild(productModal.target);
//     }
// }
