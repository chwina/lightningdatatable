import { LightningElement, track } from 'lwc';
import getAllAccount from '@salesforce/apex/getAccountsforpagination.getAllAccount';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone' }
]

export default class PaginationLwc extends LightningElement {

    columns = columns;
    data =[];
   
    NbreofPages = 1;
    perpage = 5;
    @track page = 1;
    pages = [];



    async connectedCallback(){
         this.data = await getAllAccount();
         let perpage = this.perpage;
         let da = this.data;
         this.NbreofPages = Math.ceil(da.length / perpage );
         console.log('length'+this.NbreofPages);
         for(let index = 1;index < this.NbreofPages ; index++){
             this.pages.push(index);
         }
        
    }

    get pagesList(){
        let mid = Math.floor(this.perpage / 2) + 1;
        console.log('mid'+mid);
        if(this.page > mid){
            console.log('tr'+ (parseInt(this.page) + mid));
          
            return this.pages.slice(this.page - mid , parseInt(this.page) + mid);
        }
        return this.pages.slice(0,this.perpage);
    }
    
    get hasPrev(){
        return this.page > 1;
    }

    get hasNext(){
      return this.page < this.NbreofPages;
    }

    onPrev(){
        --this.page;
    }
    onNext(){
        ++this.page;
    }

    onPageClick(event){
         this.page = event.target.dataset.id;
    }
    
    get currentPageData() {
       let page = this.page;
       let pagesize = this.perpage;
       let startindex = (page - 1) * pagesize;
       let endindex = page * pagesize ; 

       return this.data.slice(startindex, endindex);
    }
    
}