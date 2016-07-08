var system = require('system');
var args = system.args;
var build = args[4];
var html = 'http://sz.lianjia.com/ershoufang/rs' + build; // args[4] is first arg of this js
var date = new Date();
var path = "./";
var month = date.getMonth()+1;
var myfile = path + date.getFullYear() + '-' + month + '-' + date.getDate() + '-' + build + ".txt";
var selector = '#newAddHouseTpl';
var num  = new Array();
var pages = new Array(10);

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementsByClassName('listContent')[0];
        var list  = table.childNodes;
        var r = list.length;
        var data = new Array(r); 
        
        for (var i=0/*skip title*/; i<r; i++) {
            var now = new Date();
            var mon = now.getMonth()+1;
            var text = now.getFullYear() + "." + mon + "." + now.getDate() + ' ';
            var panel = list[i].getElementsByClassName('info')[0];
            var info = panel.getElementsByClassName('houseInfo')[0];
            data[i] = text;
            text = info.innerText.replace(/精装|简装|其他/g,'');
            text = text.replace(/\s*/g, '');
            text = text.replace(/\|/g, ' ');
            data[i] += text;

            info = panel.getElementsByClassName('priceInfo')[0];
            data[i] += ' ' + info.children[0].innerText.match(/\d+/);
            data[i] += ' ' + info.children[1].innerText.match(/\d+/);
            
            info = panel.getElementsByClassName('followInfo')[0];
            text = info.innerText.match(/\d+次/);
            data[i] += ' ' + text;
        }
        return data; 
    });
    if (num) {
        num.forEach(function(param){
            console.log(param);
            fs.write(myfile, param+'\n', 'a'); 
        });
    }
};

casper.start(html);

// get pages link
casper.then(function getPages(){
    casper.waitForSelector('.newHousePush');
    pages = casper.evaluate(function (){
        var list = document.getElementsByClassName('contentBottom clear')[0];
        list = list.getElementsByClassName('page-box fr')[0].children[0];
        //return list.childNodes.length;
        var data = new Array(list.childNodes.length);
        
        for (var m = 0; m < list.childNodes.length; m++) {
            data[m] = list.children[m].getAttribute('href');
            var a = document.createElement('a');
            a.href = data[m];
            data[m] = a.href;
        }
        return data; 
    });
    pages[0] = html;
    console.log(pages);
});

casper.then(function debug3(){
    pages.forEach(function getLinks(url) {
        //console.log(url);
        casper.thenOpen(url, function () {
            getData();
        });
    });
});

casper.run();

