public with sharing class getAccountsforpagination {
    
    @AuraEnabled
    public static List<Account>  getAllAccount(){
            return [Select Id,Name,Phone from Account limit 100];
        } 

        
}
