var html = 'http://sz.ganji.com/fang5/nanshan/';
var date = new Date();
var path = "/home/douglas/pybug/hello-pug/trunk/58/";
var month = date.getMonth()+1;
var myfile = path + date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + date.getHours() +  ".txt";
var selector = '#seltion';
var num;
var pages = new Array(2);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var data  = new Array();
        var table = document.getElementById('wrapper').getElementsByClassName('leftBox')[0].getElementsByClassName('listBox')[0];
        var list  = table.getElementsByClassName('list-style1')[0];
        var n = 0;
        var m = 0;
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i].getElementsByClassName('list-mod2')[0].children[0];
            var jjr = one.getElementsByTagName('a')[0].getAttribute('href');
            var a;
            a = a || document.createElement('a');
            a.href = jjr;
            data[m++] = a.href;
        }
        // there are two 'list-style1' elements.
        list  = table.getElementsByClassName('list-style1')[1];
        for (var i=0; i<list.childElementCount; i++) {
            var one = list.children[i].getElementsByClassName('list-mod2')[0].children[0];
            var jjr = one.getElementsByTagName('a')[0].getAttribute('href');
            var a;
            a = a || document.createElement('a');
            a.href = jjr;
            data[m++] = a.href;
        }
        return data;
    });
    //console.log(num);
    num.forEach(function debug5(para) {
        console.log(para);
        fs.write(myfile, para+'\n', 'a'); 
    });
};

casper.start(html);

casper.then(function debug() {
    for (var i=0; i<pages.length; i++) {
        var p = i + 1;
        pages[i] = 'o' + p;
    }
});

casper.then(function debug3(){
    pages.forEach(function getLinks(url) {
        url = html + url;
        casper.thenOpen(url, function () {
            getData();
        });
    });
});

casper.run();

