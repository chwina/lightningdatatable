public with sharing class LightningDataTableController {
    
      @AuraEnabled(cacheable=true)
      public static List<Account> getAllAccount(){
            
          return [Select Id , Name, Phone, Website from Account limit 10 ];
      }
}
