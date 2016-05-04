var html = 'http://shenzhen.customs.gov.cn/publish/portal109/tab61317/module173419/page';
var path = "./";
var myfile = path + "pagelist.txt"; 
var index = ['1', '2', '3', '4', '5', '6'];

var casper = require('casper').create({
    logLevel: "debug",
    verbose: true
});
var fs = require('fs');

function getData() {
    var num = casper.evaluate(function getNumFromPage() {
        var table = document.getElementById('ess_ctr173419_ListC_Info_LstC_Info');
        var r = table.rows.length;
        var data = "";
        
        for (var i=0/*skip title*/; i<r; i++) {
            var link = table.rows[i].cells[0].getElementsByTagName("a");
            data += link[0];//.getAttribute("href");
            data += "\n";
        }
        return data; 
    });
    //console.log(num);
    if (num) 
        fs.write(myfile, num, 'a'); 
};

casper.start();

index.forEach(function doEach(oneindex) {
    var onehtml = html + oneindex + '.htm';
    casper.thenOpen(onehtml);
    casper.then(function(){
        casper.waitForSelector('#ess_ctr173419_ListC_Info_LstC_Info');
    });
    casper.then(function doMain() {
        getData();
    });
});

casper.run();

