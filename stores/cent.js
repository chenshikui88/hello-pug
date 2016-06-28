var html = 'http://sz.centanet.com/link/stores.html';
var date = new Date();
var path = "/home/douglas/pybug/hello-pug/trunk/stores/";
var month = date.getMonth()+1;
var myfile = path + 'cent-' + date.getFullYear() + '-' + month + '-' + date.getDate();
var selector = '#breadCrumb';
var num = new Array();

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var data  = new Array();
        var table = document.getElementsByClassName('yqlinkr_nr')[0];
        var list  = table.getElementsByClassName('txtable')[0].children[0];
        var m = 0; 

        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i];
            var jjr = one.innerText;
            
            if (jjr.indexOf('0755') < 0)
                continue;
            data[m] = '[ ' + m + ' ] ' + jjr;
            m++;
        }
        return data;
    });
    //console.log(num);
    myfile += '-' + num.length + '.txt';
    num.forEach(function debug5(para) {
        console.log(para);
        fs.write(myfile, para+'\n', 'a'); 
    });
};

casper.start(html);

casper.then(function debug3(){
    casper.thenOpen(html, function () {
        getData();
    });
});

casper.run();

