/*
	Install the following pre-requisites:
		1. npm install jasmine-reporters (for XML Report)
		2. npm install jasmine-node -g (for XML Report)
		3. npm install protractor-jasmine2-screenshot-reporter (for HTML Report)
		4. npm install jasmine-spec-reporter --save-dev (for readable console)
*/
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var jasmineReporters = require('C:\\Users\\user\\AppData\\Roaming\\npm\\node_modules\\jasmine\\lib\\reporters');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var numberMap = {
	"0": "00", "1": "01", "2": "02", "3": "03", "4": "04", "5": "05", "6": "06", "7": "07", "8": "08", "9": "09", "10": "10", 
	"11": "11", "12": "12", "13": "13", "14": "14", "15": "15", "16": "16", "17": "17", "18": "18", "19": "19", "20": "20", 
	"21": "21", "22": "22", "23": "23", "24": "24", "25": "25", "26": "26", "27": "27", "28": "28", "29": "29", "30": "30", 
	"31": "31", "32": "32", "33": "33", "34": "34", "35": "35", "36": "36", "37": "37", "38": "38", "39": "39", "40": "40", 
	"41": "41", "42": "42", "43": "43", "44": "44", "45": "45", "46": "46", "47": "47", "48": "48", "49": "49", "50": "50", 
	"51": "51", "52": "52", "53": "53", "54": "54", "55": "55", "56": "56", "57": "57", "58": "58", "59": "59", "60": "60", 
};
var currentDate = new Date(),
	currentHoursIn24Hour = currentDate.getHours(),
	currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
	totalDateString = (currentDate.getYear()+1900) + numberMap[currentDate.getMonth() + 1] + numberMap[currentDate.getDate()] + numberMap[currentHoursIn24Hour] + numberMap[currentDate.getMinutes()];
var strDest = 'Flipkart - Test Execution Result ' + totalDateString;

var reporter = new HtmlScreenshotReporter({
	dest: strDest,
	filename: 'Flipkart - Test Execution Result.html',
	reportTitle: 'Flipkart - Test Execution Result',
	reportOnlyFailedSpecs: false,
	captureOnlyFailedSpecs: false,
	showQuickLinks: true
});

var reporterJUnit = new jasmineReporters.JUnitXmlReporter({
	savePath: strDest,
	modifyReportFileName: function(generatedFileName, suite) {
		return 'Flipkart - Test Execution Result.xml';
	},
	consolidateAll: true
});

var specReport = new SpecReporter({
	spec: {
		displayStacktrace: true
	}
});

exports.config = {
	// Setup the report before any tests start
	beforeLaunch: function() {
		return new Promise(function(resolve){
			reporter.beforeLaunch(resolve);
		});
	},
	

	// Assign the test reporter to each running instance
	onPrepare: function() {
		browser.sleep(1000);
		jasmine.getEnv().addReporter(reporter);
		jasmine.getEnv().addReporter(reporterJUnit);
		jasmine.getEnv().addReporter(specReport);
		
	},

	// Close the report after all tests finish
	afterLaunch: function(exitCode) {
		return new Promise(function(resolve){
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	},
	
	
	useAllAngular2AppRoots: true,
	framework: 'jasmine',
	  
	 capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        args: [
            '--start-maximized'
        ]
    }
	
},
	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: [ 
   'TS01_Login_AddIteam_Checkout.js'
	],

	 
    allScriptsTimeout: 60000,
	jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 60000
	}
}
