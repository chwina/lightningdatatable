import { LightningElement, track, wire } from 'lwc';
import getAllAccount from '@salesforce/apex/LightningDataTableController.getAllAccount';

const lstcolumns = [
    {label : 'Account Name' ,fieldName : 'Name',type : 'text', cellAttributes: { class: { fieldName : 'customCssClass'}} },
    {label : 'Account Website',fieldName : 'Website' , type: 'url', cellAttributes: { class: { fieldName : 'customCssClass'}}},
    {label : 'Phone', fieldName : 'Phone',type : 'phone', cellAttributes: { class: { fieldName : 'customCssClass'}} }
]
export default class LightningDataTable extends LightningElement {

      @track data=[];
      @track columns = lstcolumns;

      @wire(getAllAccount)
      getwireAccount({ error, data }){
        if(data){
          let respo = data.map(function (acc) {          
          
            const account = Object.assign({},acc);
  
          if(acc.Phone === undefined){
           Object.assign(account,{customCssClass : 'redRow boldText'})
            
          }else{
           Object.assign(account,{customCssClass : 'greenRow'})
          } 
         
          return account;
        });
        
  
             this.data = respo;
        }
      
      }

       connectedCallback() {
           
         let dataTableGlobalStyle = document.createElement('style');
        dataTableGlobalStyle.innerHTML = `
                                        .redRow{
                                          background-color:#ff8080;   
                                        }
                                        .greenRow{
                                          background-color:#99ff99;
                                        }                                        
                                        
                                        .boldText{
                                          font-weight:bold !important;
                                        }
                                        `;
        document.head.appendChild(dataTableGlobalStyle);
     
        }
      
}