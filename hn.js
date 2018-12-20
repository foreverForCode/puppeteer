

const puppeteer = require("puppeteer");

const url        = 'https://www.2beauti.com/wx/search-goods.html?tmn=1';
const taobaoUrl  = 'https://www.taobao.com/';
const tianmaoUrl = 'https://www.tmall.com/?ali_trackid=2:mm_26632258_3504122_48284354:1545289480_298_464963388&clk1=26a9b8339e876c710b8369affcfd5c61&upsid=26a9b8339e876c710b8369affcfd5c61';
const jdUrl      = 'https://www.jd.com/?cu=true&utm_source=baidu-pinzhuan&utm_medium=cpc&utm_campaign=t_288551095_baidupinzhuan&utm_term=0f3d30c8dba7459bb52f2eb5eba8ac7d_0_6a9baaaa1e8c48109dfeea330f9b0880';
const lagouUrl   = 'https://www.lagou.com/';


function sleep(time) {

    return new Promise((resolve, reject) => {

        setTimeout(()=> {resolve()}, time);
    })
}

async function fetchData(url, doms) {

    const browser = await puppeteer.launch({headless:true, args:['--no-sandbox']});

    const page = await browser.newPage();

    page.setUserAgent('Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36');

    await page.goto(url, {waitUntil:'networkidle2'});

    //await sleep(10000);
    await page.waitFor(10000);
    const testHtml = await page.$eval(doms, e => e.outerHTML);

    console.log(testHtml);

    await browser.close();
}

//fetchData(tianmaoUrl, '.body');

//fetchData(jdUrl,'.sk_item_img');

fetchData(lagouUrl, '.position_list_ul');