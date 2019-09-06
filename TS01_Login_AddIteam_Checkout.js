var flipkart = require('\.FlipkartHomePage.js');

var strPNumber = "9999999999" ;
var strPassword = "256@123" ;
var strCategory= "Electronics" ;
var strMenu= "Apple" ;
var strProduct= "Apple iPhone XR (Black, 128 GB)" ;
var CustName= "RapidEra" ;
var Phone= "9999999991" ;
var PIN= "411045" ;
var Local= "Deron Heights" ;
var Add= "Banner" ;
var strAddressType= "Work (Delivery between 10 AM - 5 PM)" ;
var strAction= "Yes" ;
var strPaymentOption= "Cash on Delivery" ;

describe('TS01 _ To login add iteam and checkout', function() {

    it('Verify that user can login and chekout successfully after adding item',function(){

    flipkart.OpenPage();
    flipkart.AccountLogin(strPNumber,strPassword);
    flipkart.SelectCategory(strCategory,strMenu);
    flipkart.SelectProduct(strProduct);
    flipkart.Checkout(CustName,Phone,PIN,Local,Add,strAddressType,strAction,strPaymentOption);

    });

    });