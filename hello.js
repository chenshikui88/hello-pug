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
        var r = list.rows.length;
        var c = list.rows[0].cells.length;
        for (var i=0; i<r; i++) {
            if (list.rows[i].cells[0].innerText == '住宅'){
                return list.rows[i].cells[1].innerText + " " + list.rows[i].cells[2].innerText;
            }
        }
        return null; 
    });
    if (num)
        console.log(num);
};

function getNext() {
    casper.then(function doClick() {
        casper.click(label);
    });
    casper.then(function (){
        casper.waitForSelectorTextChange(seltbl, getNum); 
    });
};

var curTime = new Date();
var mon = curTime.getMonth() + 1;
var day = curTime.getDate();
var year = curTime.getFullYear();
var myfile = "fang-" + year + "-" + mon + "-" + day + ".txt";

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

