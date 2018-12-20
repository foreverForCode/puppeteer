
var Fetch = require('./puppeteer_core');
var cheerio = require('cheerio');
var fs      = require('fs');

var result  = [];

function fetchData(urls, callback) {

    Fetch.fetch({url : 'https://www.lagou.com/'||urls, doms:'.position_list_ul', callback:function (e) {

            callback&&callback(e);
    }});
}
function write(arr) {

    var result = '';

    arr.map(function (item) {

        for(var key in item){

            var temp = '';
            temp = ''+ key + '  :  ' + item[key] + ' ';

            result += temp;
        }

        result += '\n';
    })

    fs.writeFileSync('./job.txt', result);
}

fetchData('https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=1',function (e) {

    //fs.writeFileSync('./result.html',e)
    var $ = cheerio.load(e);

    $('li').map(function (item) {

        var temp = {};

        temp.data_salary = $(this).attr('data-salary');
        temp.data_company = $(this).attr('data-company');

        temp.data_positionname = $(this).attr('data-positionname');

        result.push(temp);
    })

    write(result);

})


