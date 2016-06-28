var html = 'http://shenzhenlianjia1.anjuke.com/gongsi-md/';
var date = new Date();
var path = "/home/douglas/pybug/hello-pug/trunk/stores/";
var month = date.getMonth()+1;
var myfile = path + 'lj-' + date.getFullYear() + '-' + month + '-' + date.getDate();
var selector = '#seo-box';
var num;
var pages = new Array(99);
pages[0] = html;

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var data  = new Array();
        var table = document.getElementById('content').getElementsByClassName('company-contents')[0];
        var list  = table.getElementsByClassName('company-left')[0].getElementsByClassName('comp-list')[0];
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i].getElementsByTagName('a')[0];
            var jjr = one.innerText;
            
            data[i] = '[ ' + i + ' ] ' + jjr;
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
    pages.forEach(function getLinks(url) {
        casper.thenOpen(url, function () {
            getData();
        });
    });
});

casper.run();

