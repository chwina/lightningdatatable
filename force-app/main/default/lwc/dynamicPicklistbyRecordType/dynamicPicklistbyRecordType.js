import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class DynamicPicklistbyRecordType extends LightningElement {
      
   @track RecordTypeoptions = [];
   @track Ratingoptions = [];

   recordTypeId = '';


   
   @wire(getObjectInfo,{objectApiName : ACCOUNT_OBJECT})
   wireAccount({data,error}){
      let tempRecordTypes = [];
       if(data){
        
           let getData = data.recordTypeInfos;
           for(let val in getData){
               if(!getData[val].master)
                  tempRecordTypes.push({'label' : getData[val].name , 'value' : getData[val].recordTypeId});
           }
           this.RecordTypeoptions = tempRecordTypes;
       }
       else if (error) {
        console.log("Error Occured ---> " + error);
    }
   }

   @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: '$recordTypeId' })
    wiredRecordTypeInfo({ data, error }){
          if(data){
            this.Ratingoptions = data.picklistFieldValues.Rating.values;
          }
          else if (error) {
            console.log("Error Occured ---> " + error);
          }
    }

        handleChangeRecordType(event){
                 this.recordTypeId = event.target.value;
        }

}