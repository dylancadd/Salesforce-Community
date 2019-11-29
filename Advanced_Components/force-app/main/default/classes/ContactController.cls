public with sharing class ContactController { 

    @AuraEnabled(cacheable=true)
    public static List<Contact> editContact(String searchKey) {
        return [SELECT Id, Name FROM Contact WHERE Id = :searchKey];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accountName) {

        if(String.isBlank(accountName)) {
            return new List<Contact>();
        }

        String key = '%' + accountName + '%';
        return [SELECT Id, firstName, lastName, Phone, Email, AccountId, Account.Name FROM Contact WHERE Account.Name LIKE : key ORDER BY Name];
        // return [SELECT Account.Id, Account.Name, Account.AccountNumber, (SELECT firstName, Contact.lastName, Contact.Phone, Contact.Email, Contact.AccountId FROM Contact WHERE Account.Name LIKE : key) FROM Account ORDER BY Name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> showContacts(String searchKey) {

        List<Contact> contact = new List<Contact>();

        try {
            contact = [SELECT Id, firstName, lastName, Phone, Email, AccountId FROM Contact WHERE AccountId = :searchKey ORDER BY Name];
        } catch (QueryException qe) {
            System.debug('No Contact was returned.');
        }

        return contact;
    }



}