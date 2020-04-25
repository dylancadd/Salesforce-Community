public without sharing class ContactController { 


    @AuraEnabled
    public static void deleteCulverContact(string searchKey) {

        delete new Contact(Id=searchKey);
    }



    @AuraEnabled(cacheable=true)
    public static List<Contact> searchCulverContact(string searchKey) {
        string key = '%' + searchKey + '%';
		
       // create contact list to store search result 
        List<Contact> contact = new List<Contact>();
     
	   // query contact records
        for(Contact current : [Select id, Name, FirstName, LastName, Phone, Email, Account.Name
                            From Contact
                            WHERE (Account.Name = : 'Culvers - Newville') AND (name LIKE : key)
                            ORDER BY Name]){
           contact.add(current);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(contact.size() == 0){
            throw new AuraHandledException('No Record Found...'); 
         }
         
        return contact;
    }


    @AuraEnabled
    public static List<Contact> getContactListCulversForDelete() {
        return [
            SELECT Id, Name, FirstName, LastName, Phone, Email, AccountId, Account.Name FROM Contact WHERE Account.Name LIKE : 'Culvers - Newville' ORDER BY Name
        ];
    }






    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListCulvers() {
        return [
            SELECT Id, Name, FirstName, LastName, Phone, Email, AccountId, Account.Name FROM Contact WHERE Account.Name LIKE : 'Culvers - Newville' ORDER BY Name
        ];
    }

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