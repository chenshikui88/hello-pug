var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var seltbl = '#ctl00_ContentPlaceHolder1_clientList1'; 
var labelArr = ["#ctl00_ContentPlaceHolder1_hypBa", 
"#ctl00_ContentPlaceHolder1_hypFt",
"#ctl00_ContentPlaceHolder1_hypLg",
"#ctl00_ContentPlaceHolder1_hypLh",
"#ctl00_ContentPlaceHolder1_hypNs",
"#ctl00_ContentPlaceHolder1_hypYt"];
var label;

function getNum() {
    var num = casper.evaluate(function getNumFromPage() {
        var list = document.getElementById('ctl00_ContentPlaceHolder1_clientList1');
        var c = list.rows.length;
        var r = list.rows[0].cells.length;
        return list.rows[c-1].cells[r-1];
    });
    console.log(num.innerText);
};

function getNext() {
    casper.then(function doClick() {
        casper.click(label);
    });
    casper.then(function (){
        casper.waitForSelectorTextChange(seltbl, getNum); 
    });
};

casper.start();

casper.thenOpen('http://ris.szfdc.gov.cn/credit/showcjgs/esfcjgs.aspx');
casper.then(function (){
    casper.waitForSelector('#ctl00_ContentPlaceHolder1_hypNs', getNum);
});

labelArr.forEach( function openEach(mylabel) {
        casper.then(function (){
            label = mylabel;
            getNext();
        });
});

casper.run();

