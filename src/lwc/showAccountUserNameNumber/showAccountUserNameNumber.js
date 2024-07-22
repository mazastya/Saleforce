import {LightningElement, track, wire} from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMPLOYEE_NUMBER_FIELD from '@salesforce/schema/User.EmployeeNumber';
import IS_MANAGER_FIELD from '@salesforce/schema/User.IsManager__c';

export default class ShowAccountUserNameNumber extends LightningElement {
    @track openModal = false;

    @wire(getRecord, { recordId: USER_ID, fields: [NAME_FIELD, EMPLOYEE_NUMBER_FIELD, IS_MANAGER_FIELD] })
    user;

    get userName() {
        return this.user.data ? this.user.data.fields.Name.value : '';
    }

    get userNumber() {
        return this.user.data ? this.user.data.fields.EmployeeNumber.value : '';
    }

    get isManager() {
        return this.user.data ? this.user.data.fields.IsManager__c.value : false;
    }

    openModal() {
        this.openModal = true;
    }

    closeModal() {
        this.openModal = false;
    }

    handleShowModal() {
        this.template.querySelector('c-product-modal').openModal = true;
    }
}
