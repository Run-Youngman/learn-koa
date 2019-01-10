var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
var baseUrl = 'https://www.qqtn.com/'; //输入任何网址都可以
const cheerio = require('cheerio');

module.exports = {
    'POST /createEmployee': async (ctx, next) => {
        var name = ctx.request.body.name || '';
        var password = ctx.request.body.password || '';
        var age = ctx.request.body.age || '';
        var salary = ctx.request.body.salary || '';
        var phone = ctx.request.body.phone || '';
        var employee = new ctx.models.Employee({
            name:name,
            password:password,
            age:age,
            salary:salary,
            phone:phone,
        })
        let a = await employee.save();
        ctx.body = a;
    },
    'PUT /updateEmployee': async (ctx, next) => {
        var name = ctx.request.body.name || '';
        var age = ctx.request.body.age || '';
        var salary = ctx.request.body.salary || '';
        var phone = ctx.request.body.phone || '';
        let obj = {
            name,
            age,
            salary,
            phone
        }
        let rst = await ctx.models.Employee.updateOne({'name':ctx.request.query.name}, obj);
        ctx.response.body = rst;
    },
    'DELETE /deleteEmployee': async (ctx, next) => {
        let rst = await ctx.models.Employee.deleteOne({'name': ctx.request.query.name});
        ctx.response.body = rst;
    },
    'GET /data': async (ctx, next) => {
        ctx.response.type = 'json';
        ctx.response.body = { data: 'Hello World',str: ctx.state.str};
    },
    'GET /tabledata': async (ctx, next) => {
        let rst = await ctx.models.Employee.find();
        ctx.response.body = rst;
    },
    'GET /users': async (ctx, next) => {
        var query = ctx.request.query; // if nothing to pass just return a {}
        var rst = [];
        if (query.name) {
            rst = await ctx.models.User.find({userName: query.name});
        }else {
            rst = await ctx.models.User.find();
        }
        ctx.response.body = {users: rst};
    },
    'GET /wormpic': async (ctx, next) => {
        // ctx.response.header = {"Access-Control-Allow-Origin": "*"};
        // ctx.response.header = {'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS'};
        // ctx.response.header = {"Access-Control-Allow-Headers": "X-Requested-With"};
        // ctx.response.header = {'Access-Control-Allow-Headers': 'Content-Type'};
        //类型
        var type = ctx.request.query.type;
        //页码
        var page = ctx.request.query.page;
        type = type || 'weixin';
        page = page || '1';
        var route = `tx/${type}tx_${page}.html`;
        //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
        let response  = await superagent.get(baseUrl + route).charset('gb2312');
        var items = [];
        // if (err) {
        //     console.log('ERR: ' + err);
        //     ctx.response.type = 'json';
        //     ctx.response.body = { failed: true,reason: 'get pics failed',data:items};
        //     return;
        // }
        var $ = cheerio.load(response.text);
        $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function(idx, element) {
            var $element = $(element);
            var $subElement = $element.find('img');
            var thumbImgSrc = $subElement.attr('src');
            items.push({
                title: $(element).attr('title'),
                href: $element.attr('href'),
                thumbSrc: thumbImgSrc
            });
        });
        ctx.response.type = 'json';
        ctx.response.body = items;
    }
};
