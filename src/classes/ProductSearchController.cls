public with sharing class ProductSearchController {
    @AuraEnabled
    public static List<Product__c> searchProducts(String name, String description) {
        String nameFilter = '%' + name + '%';
        List<Product__c> products = [SELECT Id, Name, Description__c, Family__c, Type__c FROM Product__c WHERE Name LIKE :nameFilter];
        if (!String.isEmpty(description)) {
            products = products.stream().filter(product - > product.Description__c.includes(description)).collect(Collectors.toList());
        }
        return products;
    }
}
