import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';

export default class ParentChildRecords extends LightningElement {

    @track accountName = '';
    accountid = '';
    contactid = '';

    handleNameChange(event){
        this.accountName = event.target.value;
    }

    connectedCallback(){
        console.log('testpop'+JSON.stringify(NAME_FIELD));
    }

    handlesave(){
        console.log('test');
       const fields = {"RecordTypeId" : '0124J000000Qb2CQAS'};
       fields[NAME_FIELD.fieldApiName] = this.accountName;
       const recordInput = {apiName: ACCOUNT_OBJECT.objectApiName, fields};
       createRecord(recordInput)
            .then(account => {
                this.accountid = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            
               const fieldsContacts = {};
                fieldsContacts[CONTACTNAME_FIELD.fieldApiName] = this.accountName + "S contact";
                fieldsContacts[ACCOUNTID_FIELD.fieldApiName] = this.accountid;
               
                const contactInput = {apiName : CONTACT_OBJECT.objectApiName ,fields : fieldsContacts };
                createRecord(contactInput)
            .then(contact => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success',
                    }),
                );
                this.accountName = '';
            })
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: 'error.body.message',
                    variant: 'error',
                }),
            );
        });
    }


}