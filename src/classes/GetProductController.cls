public with sharing class GetProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product__c> getProducts(String family, String type) {
        String query = 'SELECT Id, Name, Family__c, Type__c FROM Product__c WHERE Family__c =: family AND Type__c =: type';
        return Database.query(query);
    }
}
