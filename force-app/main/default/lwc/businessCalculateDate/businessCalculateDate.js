import { LightningElement, track } from 'lwc';

const lstholidays = [];
lstholidays.push(new Date(2020, 7, 12));
lstholidays.push(new Date(2020, 7, 13));
lstholidays.push(new Date(2020, 7, 14));


export default class BusinessCalculateDate extends LightningElement {

    sDateVal = '';

    connectedCallback(){
         
        let DateToReturn = new Date();
        let count = 0;

        while(count<1){
            DateToReturn.setDate(DateToReturn.getDate()+1);
            if(DateToReturn.getDay() !=0 && DateToReturn.getDay() !=6 && !this.isholiday(DateToReturn)){
                count++;
            }
        }
        var dd = DateToReturn.getDate();
        var mm = DateToReturn.getMonth() + 1;   
        var yyyy = DateToReturn.getFullYear();
        
        if(dd < 10){dd = '0' + dd;}  
        
        if(mm < 10){mm = '0' + mm;}  
        
        this.sDateVal = yyyy+'-'+mm+'-'+dd;
       
        
    }

    isholiday(currentDate){
        for(var i=0;i<lstholidays.length;i++){
            if(this.compare(currentDate,lstholidays[i])) return true;
        }
        return false;
    }

    compare(currentDate,holidayDate){
        if(currentDate.getDate() == holidayDate.getDate() && currentDate.getMonth() == holidayDate.getMonth() 
        && currentDate.getFullYear() == holidayDate.getFullYear()) {
            return true;
        }
        
        return false;
    }
}