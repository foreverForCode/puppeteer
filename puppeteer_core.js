
const puppeteer = require('puppeteer');

function Fetch(option){

    const defaultOpts = {

        launchOptions:{headless : true, args : ['--no-sandbox']},
        userAgent : 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.82 Chrome/48.0.2564.82 Safari/537.36',
        url       : '',
        waitTime  : 1000,
        doms      : 'body',
        callback  : null
    }

    this.opts = Object.assign(defaultOpts, option);

    this.browser = null;
    this.page    = null;

    this.launch();
}

Fetch.prototype.launch = async function(){

    var that = this;

    that.browser = await puppeteer.launch(that.opts.launchOptions);

    that.page = await that.browser.newPage();

    that.page.setUserAgent(that.opts.userAgent);

    that.action();

}

Fetch.prototype.action = async function() {

    var that = this;

    await that.page.goto(that.opts.url, {waitUntil : 'networkidle2'});

    await that.page.waitFor(that.opts.waitTime);

    const result = await that.page.$eval(that.opts.doms,(e) => e.outerHTML );

    await that.browser.close();

    that.opts.callback && that.opts.callback(result);
}

const fetch = function(option){

    return new Fetch(option)
}
module.exports.fetch = fetch;