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
var html = 'http://ris.szfdc.gov.cn/credit/showcjgs/esfcjgs.aspx';
var label;

function getNum() {
    var num = casper.evaluate(function getNumFromPage() {
        var list = document.getElementById('ctl00_ContentPlaceHolder1_clientList1');
        var dist = document.getElementById('ctl00_ContentPlaceHolder1_lbldistrict1');
        var r = list.rows.length;
        var c = list.rows[0].cells.length;
        var data = "";
        for (var i=1/*index0 is title*/; i<r; i++) {
            data += dist.innerText + " ";
            data += list.rows[i].cells[0].innerText.trim() + " ";
            data += list.rows[i].cells[1].innerText.trim() + "     ";
            data += list.rows[i].cells[2].innerText.trim() + "\n";
        }
        return data; 
    });
    if (num) {
        fs.write(myfile, num, 'a'); 
    }
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
var fs = require('fs');

casper.start(html);

casper.then(function (){
    casper.waitForSelector(labelArr[0], getNum);
});

labelArr.forEach( function openEach(mylabel) {
        casper.then(function (){
            label = mylabel;
            getNext();
        });
});

casper.run();

