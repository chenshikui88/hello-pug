var html0 = 'http://bbs.szhome.com/500-500020-detail-172241537-1251470-0-5.html';
var html = 'http://bbs.szhome.com/500-500020-detail-172241537-1251470-0-';//.html';
var maxPages = 115; // page122, time 2015-09-28
var pages = new Array(maxPages);
var start = 7; // unformat first X pages.
var path = "./";
var myfile = path + ""; 
var selector = '#ReplyDetail';
var num  = new Array();

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    myfile = 'pc.txt';//casper.getTitle().trim() + ".txt";
    casper.waitForSelector(selector);
    num = casper.evaluate(function getNumFromPage() {
        var list  = document.getElementsByClassName('post-wrap fix item item-reply');
        var r = list.length;
        var data = new Array(r); 
        var k = 0;
        var str1 = "建筑面积";
        for (var i=0/*skip title*/; i<r; i++) {
            var reply = list[i].getElementsByClassName('post-main-wrap item-body')[0];
            reply = reply.getElementsByClassName('post-main')[0].getElementsByClassName('post post-first-child')[0];
            reply = reply.getElementsByClassName('post-content ps-r')[0].getElementsByClassName('tzContent')[0];
            
            var sub = reply.getElementsByTagName('div');
            if (sub.length > 0) { // filter reply content
                var len = reply.innerText.length;
                len = len - sub[0].innerText.length;
                data[i] = reply.innerText.substr(0,len); 
            } else 
		data[i] = reply.innerText;
            if (data[i].indexOf(str1) < 0)
                data[i] = ' ';
        }
        return data; 
    });
    //console.log(num);
    if (num) {
        num.forEach(function(param){
            console.log(param);
            fs.write(myfile, param+'\n', 'a'); 
        });
    }
};

casper.start(html0);

// If pages[] not initialized, pages.forEach did not work.
for (i=0; i<maxPages; i++) {
    pages[i] = ' ';
};

casper.then(function doMain(){
    pages.forEach(function getEachPage(page) {
        page = html + start + ".html";
        start++;
        console.log(page);
        casper.thenOpen(page, function (){
            getData();
        });
    });
});

casper.run();

