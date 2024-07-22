public with sharing class ProductController {
    @AuraEnabled
    public static Id createProduct(String productName, String productDescription, Decimal productPrice, String productFamily, String productType, String productImageUrl) {
        Product__c newProduct = new Product__c();
        newProduct.Name = productName;
        newProduct.Description__c = productDescription;
        newProduct.Family__c = productFamily;
        newProduct.Type__c = productType;
        newProduct.Price__c = productPrice;
        if (productImageUrl != null && productImageUrl != '') {
            newProduct.Image__c = productImageUrl;
        } else {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('http://www.glyffix.com/api/Image?word=' + EncodingUtil.urlEncode(productName, 'UTF-8'));
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                newProduct.Image__c = (String) results.get('image_url');
            }
        }
        insert newProduct;
        return newProduct.Id;
    }
}
