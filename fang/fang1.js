var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});

var curTime = new Date();
var mon = curTime.getMonth() + 1;
var day = curTime.getDate();
var year = curTime.getFullYear();
var fs = require('fs');

var myfile = "fang1-" + year + "-" + mon + "-" + day + ".txt";
var html = 'http://ris.szfdc.gov.cn/credit/showcjgs/ysfcjgs.aspx?cjType=0';
var seltbl = '#clientList2'; 

var labelArr = ["#ctl00_ContentPlaceHolder1_hypBa", 
"#ctl00_ContentPlaceHolder1_hypFt",
"#ctl00_ContentPlaceHolder1_hypLg",
"#ctl00_ContentPlaceHolder1_hypLh",
"#ctl00_ContentPlaceHolder1_hypNs",
"#ctl00_ContentPlaceHolder1_hypYt"];
var label;

function getNum() {
    var num = casper.evaluate(function getNumFromPage() {
        var list = document.getElementById('clientList2');
        var dist = document.getElementById('lbldistrict2');
        var r = list.rows.length;
        var c = list.rows[0].cells.length;
        var data = "";
        for (var i=1/*index0 is title*/; i<r; i++) {
            data += dist.innerText + " ";
            for (var j=0; j<c; j++) {
                data += list.rows[i].cells[j].innerText.trim() + " ";
            }
            data += "\n";
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

