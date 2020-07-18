public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts() {
        return [SELECT Id, Name, AccountNumber FROM Account ORDER BY Name];
    }

}