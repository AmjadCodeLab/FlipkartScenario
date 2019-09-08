var FlipkartPage = function(){
    global.strURL = 'http://www.flipkart.com';
    global.width = 1260; 
    global.height = 800;
    global.tempObject =  	{};
    global.protractor = protractor;
    
    var numberMap = {
                    "0": "00", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "10": "10", 
                    "11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20", 
                    "21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", 
                    "31": "31", "32": "32", "33": "33", "34": "34", "35": "35", "36": "36", "37": "37", "38": "38", "39": "39", "40": "40", 
                    "41": "41", "42": "42", "43": "43", "44": "44", "45": "45", "46": "46", "47": "47", "48": "48", "49": "49", "50": "50", 
                    "51": "51", "52": "52", "53": "53", "54": "54", "55": "55", "56": "56", "57": "57", "58": "58", "59": "59", "60": "60", 
    };
    var currentDate = new Date(),
                    currentHoursIn24Hour = currentDate.getHours()
    //   Function for TimeStamp 
    global.totalDateString = (currentDate.getYear()+1900) + numberMap[currentDate.getMonth() + 1] + numberMap[currentDate.getDate()] + numberMap[currentHoursIn24Hour] + numberMap[currentDate.getMinutes()] + numberMap[currentDate.getSeconds()] ;
    
    // Function or Method to Open URL
    this.OpenPage = function(){
    browser.get(strURL);
    expect(browser.getCurrentUr()).toContain('http://www.flipkart.com');
    browser.sleep(2000);
    };

    // Function for login into flipkart Page
    this.AccountLogin = function(strPNumber,strPassword){
    // Click on Login Link
    var LoginOption = element(by.linkText('Login & Signup'));
    LoginOption.isPresent().then(function(bln){
    if(bln==true){
        LoginOption.click();
        browser.sleep(800);
    }
    else{
        throw "Exception - Login Functionlty Missing in Page";
    }
    });
    // Verify the LoginBox and Enter valid Credentials
    var VerifyLoginPage = element(by.cssContainingText('[class=_1hgiYz"]','Login'));
    expect(VerifyLoginPage.isDisplayed()).toBe(true);
    
    var PhoneNumber = element(by.css('[class="_2zrpKA _1dBPDZ"]'));
    PhoneNumber.sendKeys(strPNumber);
    browser.sleep(800);

    var Password = element(by.css('[type="password"]'));
    Password.sendKeys(strPassword);
    browser.sleep(1000);

    // Click on Login
    var LoginBtn = element.all(by.css('[type="submit"]')).get(1);
    LoginBtn.click();
    browser.sleep();

    // Verify User Logged in to the Flipkart
    var MyAccount = element(by.cssContainingText('[class="_2aUbKa"]','My Account'));
    expect(MyAccount.isPresent()).toBe(true);
    };
     
    // Function for selecting Product Category from top menu
    this.SelectCategory = function(strCategory,strMenu){
    // Select the Category Menu
    var CategoryMenu = element(by.cssContainingText('[class="_1QZ6fC _3Lgyp8"]', strCategory));
    CategoryMenu.click();
    browser.sleep(800);

    //VerifyCategory Option Box and select menu
    var SubCategory = element(by.className('_2OZ78M _1fj2FQ'));
    SubCategory.isDisplayed().then(function(txt){
    if(txt==true){
        // Select Product e.g in Electronic Category Select Apple 
        var ClickMenu = element(by.cssContainingText('[class="_1KCOnI _3ZgIXy"]',strMenu));   
        ClickMenu.click();
        browser.sleep(1000);
    }
    else {
        throw "Expection - Menu Not Present";
    }   
    })
    };
    
    //Function for Selectin Item from Product
    this.SelectProduct = function(strProduct){
    var Product = element(by.cssContainingText('[class="_3wU53n"]',strProduct));
    Product.click();
    browser.sleep(1000);

    // After Clicking Product Page Open in new tab
    windowhandle(1);
    var AddCartBtn = element(by.cssContainingText('[class="_3oJBMI"]','GO TO CART'));
    AddCartBtn.isPresent().then(function(bln){
        if(bln==true){
        AddCartBtn.click();
        browser.sleep(1000);
        }
        else{
    throw "Exception- Not an Add Cart Page";
        }
    })
    // Place the Order
    var PlaceBtn = element(by.cssContainingText('[class="_2AkmmA iwYpF9 _7UHT_c"]','Place Order'));
    PlaceBtn.click();
    browser.sleep(2000);
    };

    // Function on Checkout : Addresss 
    this.Checkout =function(CustName,Phone,PIN,Local,Add,strAddressType,strAction,strPaymentOption){
    var VerifyDeliveryOpt = element(by.cssContainingText('[class="_1_m52b"]','Delivery Address'));
    VerifyDeliveryOpt.isPresent().toBe(true);
    browser.sleep(1000);

    // Add New Addresss: by Radio check
    var AddNew = element(by.cssContainingText('[class="_2hT5Bw"]','Add a new address'));
    AddNew.click();
    browser.sleep(1000);

    // Call Add New Address Function
    NewAddress(CustName,Phone,PIN,Local,Add,strAddressType,strAction);
    // Click on Continue to proceed Check out
    var ContinueBtn = element(by.cssContainingText('[class="_2AkmmA _2Q4i61 _7UHT_c"]','CONTINUE'));
    ContinueBtn.click();
    browser.sleep(2000);
    
    // Select Payment Option
    var PaymentOption = element(by.cssContainingText('[class="_3i_pKg"]',strPaymentOption));
    PaymentOption.click();

    ContinueBtn.click();

    browser.close();
    browser.sleep(1000);
    windowhandle(0);
    browser.sleep(1000);
    browser.close();
    
    };

    // Add New Address Function
    function NewAddress(CustName,Phone,PIN,Local,Add,strAddressType,strAction){
// Enter the Address Details
var Name = element(by.name('name')).sendKeys(CustName);
browser.sleep(1000);

var Number = element(by.name('phone')).sendKeys(Phone);
browser.sleep(1000);

var PINcode = element(by.name('pincode')).sendKeys(PIN);
browser.sleep(1000);

var Locality = element(by.name('addressLine2')).sendKeys(Local);
browser.sleep(1000);

var Address = element(by.name('addressLine1')).sendKeys(Add);
browser.sleep(1000);

var AddressType = element(by.cssContainingText('[class="_2o59RR"]',strAddressType));
AddressType.click();

if (strAction == "Yes"){
    element(by.cssContainingText('[class="_2AkmmA EqjTfe _7UHT_c"]','Save and Deliver Here')).click();
    browser.sleep(1000);
}
else if(strAction=="No"){
    element(by.cssContainingText('[class="_2AkmmA _237M5J"]','Cancel')).click();
    browser.sleep(1000);
}
    }
    // Window Handle Function
    function windowhandle(n)
            {
            browser.getAllWindowHandles().then(function(handles) {
        browser.switchTo().window(handles[n]);
        browser.sleep(2000); 
        });
            }                                              
    }
                    
    module.exports = new FlipkartPage();
    
             
    