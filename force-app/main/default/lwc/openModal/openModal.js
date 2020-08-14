import { LightningElement, track } from 'lwc';

export default class OpenModal extends LightningElement {
   @track ShowPanel = false;

   openmodal(){
       this.ShowPanel = true;
   }
  
   closeModal(){
    this.ShowPanel = false;
   }



}