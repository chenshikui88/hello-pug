var system = require('system');
var args = system.args;
var build = args[4];
var html = 'http://sz.lianjia.com/ershoufang/rs' + build; // args[4] is first arg of this js
var date = new Date();
var path = "./";
var myfile = path + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '-'; 
var selector = '#house-lst';
var num  = new Array();

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    myfile += build + ".txt";
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementById('house-lst');
        var list  = table.childNodes;
        var r = list.length;
        var data = new Array(r); 
        
        for (var i=0/*skip title*/; i<r; i++) {
            var now = new Date();
            var text = now.getFullYear() + "." + now.getMonth() + "." + now.getDate() + ' ';
            var panel = list[i].getElementsByClassName('info-panel')[0];
            var info = panel.childNodes[1];
            info = info.childNodes[0].children;
            for (var m=0; m<info.length; m++) {
                text += info[m].innerText.replace(/\s+/g,'') + ' ';
            }
            data[i] = text;

            info = panel.children[2];
            text = info.children[0].innerText + ' ' + info.children[1].innerText.replace(/\s+/g,'');
            data[i] += text + ' ';

            info = panel.children[3];
            text = info.children[0].children[0].innerText; 
            data[i] += text;
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

casper.then(function debug3(){
    getData();
});

casper.run();

