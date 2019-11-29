public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts() {
        return [SELECT Id, Name, AccountNumber FROM Account ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> testing() {
        return [SELECT Account.Name,(SELECT Contact.Name FROM contacts) FROM Account ORDER BY Name];
    }


    @AuraEnabled(cacheable=true)
    public static List<Account> hey() {
        return [SELECT Account.Id, Account.Name, Account.AccountNumber, (SELECT Contact.Name FROM Contacts) FROM Account ORDER BY Name];
    }

}